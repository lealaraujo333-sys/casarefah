import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Context, Next } from "hono";

const prisma = new PrismaClient();
export const adminRoute = new Hono();

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

// Login Schema
const loginSchema = z.object({
    email: z.string().email().optional(),
    password: z.string().min(1)
});

// Login Route
adminRoute.post("/login", zValidator("json", loginSchema), async (c) => {
    const { password, email } = c.req.valid("json");

    try {
        // Find admin user (first admin if no email provided)
        const user = email
            ? await prisma.user.findUnique({ where: { email } })
            : await prisma.user.findFirst({ where: { role: "ADMIN" } });

        if (!user) {
            return c.json({ error: "Usuário não encontrado" }, 401);
        }

        // Verify password with bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return c.json({ error: "Senha incorreta" }, 401);
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return c.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return c.json({ error: "Erro no servidor" }, 500);
    }
});

// Middleware to protect routes
export const authMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ error: "Token não fornecido" }, 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string };

        // Add user info to context for later use
        c.set("user", decoded);

        await next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return c.json({ error: "Token expirado" }, 401);
        }
        return c.json({ error: "Token inválido" }, 401);
    }
};

// Verify token route (useful for frontend to check if still authenticated)
adminRoute.get("/verify", authMiddleware, async (c) => {
    const user = c.get("user");
    return c.json({ valid: true, user });
});

// SEO Checker Utility (Protected)
adminRoute.post("/seo-check", authMiddleware, async (c) => {
    const body = await c.req.json();
    const description = body.description || "";

    const analysis = {
        length: description.length,
        hasKeywords: /vela|aroma|decoração|refah/i.test(description),
        score: 0
    };

    if (analysis.length > 50) analysis.score += 50;
    if (analysis.hasKeywords) analysis.score += 50;

    return c.json(analysis);
});

