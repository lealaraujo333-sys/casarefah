import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { productsRoute } from "./routes/products";
import { adminRoute } from "./routes/admin";
import { kitsRoute } from "./routes/kits";
import { settingsRoute } from "./routes/settings";
import { imagesRoute } from "./routes/images";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const app = new Hono();

// Global Middleware
app.use("*", logger());

// CORS - Restrict in production, allow all in dev
const allowedOrigins = process.env.NODE_ENV === "production"
    ? ["https://casarefah.vercel.app", "https://www.casarefah.com.br", "https://casarefah.com.br"]
    : ["*"];

app.use("*", cors({
    origin: allowedOrigins,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Health Check endpoint (for Render and keep-alive)
app.get("/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// Serve static product images BEFORE API routes
// This must come first so /products/*.jpg|png|etc are served as files, not routed to API
app.use("/products/*", async (c, next) => {
    const path = c.req.path;
    // Only serve as static if it's an image file
    if (/\.(png|jpg|jpeg|webp|gif|ico|svg)$/i.test(path)) {
        const staticMiddleware = serveStatic({ root: "./public" });
        return staticMiddleware(c, next);
    }
    return next();
});

// API Routes
app.get("/api", (c) => c.json({ message: "Casa Refah API is running 🚀", status: "online" }));
app.route("/products", productsRoute);
app.route("/admin", adminRoute);
app.route("/kits", kitsRoute);
app.route("/settings", settingsRoute);
app.route("/images", imagesRoute);

// Serve other static files
app.use("/assets/*", serveStatic({ root: "./public" }));
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


