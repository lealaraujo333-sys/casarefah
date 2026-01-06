import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { productsRoute } from "./routes/products";
import { adminRoute } from "./routes/admin";
import { kitsRoute } from "./routes/kits";
import { settingsRoute } from "./routes/settings";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const app = new Hono();

// Global Middleware
app.use("*", logger());
app.use("*", cors()); // Open CORS for dev, restrict in prod

// Health Check endpoint (for Render and keep-alive)
app.get("/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// API Routes (must come before static files)
app.get("/api", (c) => c.json({ message: "Casa Refah API is running 🚀", status: "online" }));
app.route("/products", productsRoute);
app.route("/admin", adminRoute);
app.route("/kits", kitsRoute);
app.route("/settings", settingsRoute);

// Serve static files from public directory
app.use("/assets/*", serveStatic({ root: "./public" }));
app.use("/products/*", serveStatic({ root: "./public" })); // Product images
app.use("/favicon.ico", serveStatic({ root: "./public" }));

// SPA Fallback - Serve index.html for all non-API routes
app.get("*", async (c) => {
    const indexPath = join(process.cwd(), "public", "index.html");

    if (existsSync(indexPath)) {
        const html = readFileSync(indexPath, "utf-8");
        return c.html(html);
    }

    // If no build exists, return helpful message
    return c.html(`
        <!DOCTYPE html>
        <html>
        <head><title>Casa Refah API</title></head>
        <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
            <h1>🚀 Casa Refah API</h1>
            <p>API online! Frontend hospedado na Vercel.</p>
            <hr />
            <p><a href="/api">Ver API Status</a> | <a href="/health">Health Check</a></p>
        </body>
        </html>
    `);
});

// Error Handling
app.onError((err, c) => {
    console.error(`${err}`);
    return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
console.log(`🚀 Casa Refah API running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});

// Keep-alive: Self-ping every 14 minutes to prevent Render from sleeping (free tier sleeps after 15min)
const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
if (RENDER_URL) {
    const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
    setInterval(async () => {
        try {
            const response = await fetch(`${RENDER_URL}/health`);
            if (response.ok) {
                console.log(`[Keep-Alive] Ping successful at ${new Date().toISOString()}`);
            }
        } catch (error) {
            console.error(`[Keep-Alive] Ping failed:`, error);
        }
    }, PING_INTERVAL);
    console.log(`[Keep-Alive] Self-ping enabled every 14 minutes`);
}


