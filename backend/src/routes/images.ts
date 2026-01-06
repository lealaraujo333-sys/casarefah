import { Hono } from "hono";
import { readdirSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { authMiddleware } from "./admin";

export const imagesRoute = new Hono();

const PRODUCTS_DIR = join(process.cwd(), "public", "products");

// Ensure products directory exists
if (!existsSync(PRODUCTS_DIR)) {
    mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// GET /images - List all product images (Protected)
imagesRoute.get("/", authMiddleware, async (c) => {
    try {
        const files = readdirSync(PRODUCTS_DIR);
        const images = files
            .filter(f => /\.(png|jpg|jpeg|webp|gif)$/i.test(f))
            .map(f => ({
                name: f,
                path: `/products/${f}`,
                url: `/products/${f}`
            }));
        return c.json(images);
    } catch (e) {
        console.error("List images error:", e);
        return c.json({ error: "Erro ao listar imagens" }, 500);
    }
});

// POST /images/upload - Upload new image (Protected)
imagesRoute.post("/upload", authMiddleware, async (c) => {
    try {
        const formData = await c.req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return c.json({ error: "Nenhum arquivo enviado" }, 400);
        }

        // Validate file type
        const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return c.json({ error: "Tipo de arquivo não permitido. Use PNG, JPG, WebP ou GIF." }, 400);
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return c.json({ error: "Arquivo muito grande. Máximo 5MB." }, 400);
        }

        // Generate safe filename
        const originalName = file.name.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9.-]/g, "-")
            .replace(/-+/g, "-");

        const timestamp = Date.now();
        const ext = originalName.split(".").pop();
        const safeName = `${originalName.replace(`.${ext}`, "")}-${timestamp}.${ext}`;

        const filePath = join(PRODUCTS_DIR, safeName);

        // Save file
        const buffer = Buffer.from(await file.arrayBuffer());
        writeFileSync(filePath, buffer);

        const imagePath = `/products/${safeName}`;

        return c.json({
            success: true,
            path: imagePath,
            name: safeName
        }, 201);

    } catch (e) {
        console.error("Upload error:", e);
        return c.json({ error: "Erro ao fazer upload" }, 500);
    }
});
