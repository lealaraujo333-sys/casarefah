import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const kitsRoute = new Hono();

// GET /kits
kitsRoute.get("/", async (c) => {
    const kits = await prisma.kit.findMany({
        include: {
            components: {
                include: { product: true }
            }
        }
    });
    return c.json(kits);
});

// POST /kits/calculate (Price Validator)
kitsRoute.post("/calculate", async (c) => {
    const { componentIds } = await c.req.json() as { componentIds: string[] };

    if (!componentIds || componentIds.length === 0) {
        return c.json({ total: 0 });
    }

    const products = await prisma.product.findMany({
        where: {
            id: { in: componentIds }
        }
    });

    const total = products.reduce((sum, p) => sum + p.price, 0);

    // Apply logic: 10% discount for kits with 3+ items
    const discount = componentIds.length >= 3 ? 0.9 : 1.0;

    return c.json({
        originalTotal: total,
        finalTotal: total * discount,
        discountApplied: discount < 1.0
    });
});
