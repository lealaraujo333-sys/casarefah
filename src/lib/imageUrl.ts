// Image URL utility for resolving product image paths
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Resolves a product image path to a full URL
 * - If path starts with http, return as-is
 * - If path starts with /products/, prepend API_URL
 * - Otherwise return as-is (for local assets)
 */
export const getImageUrl = (path: string): string => {
    if (!path) return "/products/placeholder.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/products/")) return `${API_URL}${path}`;
    return path;
};

export default getImageUrl;
