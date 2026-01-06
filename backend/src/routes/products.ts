import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "./admin";

const prisma = new PrismaClient();
export const productsRoute = new Hono();

// Schemas
const productSchema = z.object({
    name: z.string().min(3),
    slug: z.string().min(3),
    price: z.number().positive(),
    originalPrice: z.number().optional(),
    description: z.string(),
    image: z.string().min(1), // Changed from .url() to accept local paths like /products/image.png
    category: z.string(),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
    dimensions: z.string().optional(),
    packaging: z.string().optional(),
    details: z.string().optional(),
    care: z.string().optional()
});

// GET /products (Public)
productsRoute.get("/", async (c) => {
    const category = c.req.query("category");
    const products = await prisma.product.findMany({
        where: category ? { category } : undefined,
        orderBy: { createdAt: "desc" }
    });
    return c.json(products);
});

// GET /products/:slug (Public)
productsRoute.get("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const product = await prisma.product.findUnique({ where: { slug } });

    if (!product) return c.json({ error: "Product not found" }, 404);
    return c.json(product);
});

// POST /products (Protected - requires auth)
productsRoute.post("/", authMiddleware, zValidator("json", productSchema), async (c) => {
    const data = c.req.valid("json");
    try {
        const product = await prisma.product.create({ data });
        return c.json(product, 201);
    } catch (e) {
        console.error("Create product error:", e);
        return c.json({ error: "Erro ao criar produto. Slug já existe?" }, 400);
    }
});

// PUT /products/:id (Protected - requires auth)
productsRoute.put("/:id", authMiddleware, async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    try {
        const product = await prisma.product.update({
            where: { id },
            data
        });
        return c.json(product);
    } catch (e) {
        console.error("Update product error:", e);
        return c.json({ error: "Erro ao atualizar produto" }, 400);
    }
});

// DELETE /products/:id (Protected - requires auth)
productsRoute.delete("/:id", authMiddleware, async (c) => {
    const id = c.req.param("id");
    try {
        await prisma.product.delete({ where: { id } });
        return c.json({ message: "Produto excluído com sucesso" });
    } catch (e) {
        console.error("Delete product error:", e);
        return c.json({ error: "Erro ao excluir produto" }, 400);
    }
});

