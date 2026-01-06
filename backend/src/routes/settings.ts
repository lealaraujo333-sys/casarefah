import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "./admin";

const prisma = new PrismaClient();
export const settingsRoute = new Hono();

// Default settings
const DEFAULT_SETTINGS = {
    storeName: "Casa Refah",
    whatsapp: "(11) 99999-9999",
    email: "contato@casarefah.com",
    notifyNewOrders: "false",
    notifyLowStock: "false"
};

// GET /settings - Get all settings (Protected)
settingsRoute.get("/", authMiddleware, async (c) => {
    try {
        const settings = await prisma.settings.findMany();

        // Convert array to object and merge with defaults
        const settingsObject = settings.reduce((acc, s) => {
            acc[s.key] = s.value;
            return acc;
        }, {} as Record<string, string>);

        // Return merged settings (defaults + stored)
        return c.json({ ...DEFAULT_SETTINGS, ...settingsObject });
    } catch (error) {
        console.error("Get settings error:", error);
        return c.json({ error: "Erro ao buscar configurações" }, 500);
    }
});

// PUT /settings - Update settings (Protected)
const updateSettingsSchema = z.object({
    storeName: z.string().optional(),
    whatsapp: z.string().optional(),
    email: z.string().email().optional(),
    notifyNewOrders: z.string().optional(),
    notifyLowStock: z.string().optional()
});

settingsRoute.put("/", authMiddleware, zValidator("json", updateSettingsSchema), async (c) => {
    const data = c.req.valid("json");

    try {
        // Upsert each setting key-value pair
        const updates = Object.entries(data).map(async ([key, value]) => {
            if (value !== undefined) {
                return prisma.settings.upsert({
                    where: { key },
                    update: { value: String(value) },
                    create: { key, value: String(value) }
                });
            }
        });

        await Promise.all(updates);

        // Return updated settings
        const allSettings = await prisma.settings.findMany();
        const settingsObject = allSettings.reduce((acc, s) => {
            acc[s.key] = s.value;
            return acc;
        }, {} as Record<string, string>);

        return c.json({
            message: "Configurações atualizadas com sucesso",
            settings: { ...DEFAULT_SETTINGS, ...settingsObject }
        });
    } catch (error) {
        console.error("Update settings error:", error);
        return c.json({ error: "Erro ao atualizar configurações" }, 500);
    }
});

// PUT /settings/password - Change admin password (Protected)
const changePasswordSchema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(6)
});

settingsRoute.put("/password", authMiddleware, zValidator("json", changePasswordSchema), async (c) => {
    const { currentPassword, newPassword } = c.req.valid("json");
    const user = c.get("user") as { userId: string };

    try {
        // Import bcrypt dynamically to avoid circular dependencies
        const bcrypt = await import("bcryptjs");

        // Get current user
        const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });
        if (!dbUser) {
            return c.json({ error: "Usuário não encontrado" }, 404);
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, dbUser.password);
        if (!isValid) {
            return c.json({ error: "Senha atual incorreta" }, 401);
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update password
        await prisma.user.update({
            where: { id: user.userId },
            data: { password: hashedPassword }
        });

        return c.json({ message: "Senha alterada com sucesso" });
    } catch (error) {
        console.error("Change password error:", error);
        return c.json({ error: "Erro ao alterar senha" }, 500);
    }
});
