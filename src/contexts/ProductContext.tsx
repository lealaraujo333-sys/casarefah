import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types/product";
import { products as initialProducts } from "@/data/products";

// API URL - use environment variable or default to localhost for development
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Helper to get auth token
const getAuthToken = () => localStorage.getItem("casarefah_token");

// Helper to create headers with auth
const getAuthHeaders = () => {
    const token = getAuthToken();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    getProductBySlug: (slug: string) => Product | undefined;
    getProductsByCategory: (category: string) => Product[];
    isLoading: boolean;
    refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    // Start with static products as default - ensures products always show
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${API_URL}/products`);
            if (res.ok) {
                const data = await res.json();
                if (data && data.length > 0) {
                    setProducts(data);
                }
            }
        } catch (err) {
            // Silently fall back to static products
            console.log("Using static product data (backend not available)");
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh function for external use
    const refreshProducts = async () => {
        await fetchProducts();
    };

    // Initial fetch
    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product: Product) => {
        try {
            const res = await fetch(`${API_URL}/products`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(product)
            });
            if (res.ok) {
                const newProduct = await res.json();
                setProducts(prev => [newProduct, ...prev]);
                return;
            } else if (res.status === 401) {
                console.error("Unauthorized: Token expired or invalid");
            }
            // Fallback: add locally
            setProducts(prev => [product, ...prev]);
        } catch (e) {
            // Fallback: add locally
            setProducts(prev => [product, ...prev]);
        }
    };

    const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify(updatedFields)
            });
            if (res.ok) {
                const updated = await res.json();
                setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
                return;
            } else if (res.status === 401) {
                console.error("Unauthorized: Token expired or invalid");
            }
            // Fallback: update locally
            setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
        } catch (e) {
            // Fallback: update locally
            setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders()
            });
            if (res.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
                return;
            } else if (res.status === 401) {
                console.error("Unauthorized: Token expired or invalid");
            }
            // Fallback: delete locally
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (e) {
            // Fallback: delete locally
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    const getProductBySlug = (slug: string) => {
        return products.find((p) => p.slug === slug);
    };

    const getProductsByCategory = (category: string) => {
        return products.filter((p) => p.category === category);
    };

    return (
        <ProductContext.Provider
            value={{ products, addProduct, updateProduct, deleteProduct, getProductBySlug, getProductsByCategory, isLoading, refreshProducts }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};


