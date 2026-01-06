// Image URL utility for resolving product image paths
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Resolves a product image path to a full URL
 * - If path starts with http, return as-is (external URL)
 * - If path contains timestamp (uploaded via API), use API_URL to load from Render
 * - Otherwise return as-is (local asset from public/products/ served by Vercel)
 * 
 * Note: Images in public/products/ are deployed with the frontend on Vercel.
 * Only dynamically uploaded images need to be fetched from the API.
 */
export const getImageUrl = (path: string): string => {
    if (!path) return "/products/placeholder.png";
    if (path.startsWith("http")) return path;

    // Check if this is a dynamically uploaded image (contains timestamp pattern)
    // e.g., /products/image-name-1767718436659.jpg
    const isUploadedImage = /\/products\/.*-\d{13}\.(jpg|jpeg|png|webp|gif)$/i.test(path);

    if (isUploadedImage) {
        // Uploaded images are on Render, need full API URL
        return `${API_URL}${path}`;
    }

    // Static images from public/products/ are served by Vercel directly
    return path;
};

export default getImageUrl;

