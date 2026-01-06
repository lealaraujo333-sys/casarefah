import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

// API URL - matches backend port
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Check for existing token on init
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!localStorage.getItem("casarefah_token");
    });

    const getToken = useCallback(() => {
        return localStorage.getItem("casarefah_token");
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("casarefah_token", data.token);
                setIsAuthenticated(true);
                return true;
            }

            // Handle specific error messages from backend
            const error = await res.json().catch(() => ({ error: "Erro desconhecido" }));
            console.error("Login failed:", error.error);
            return false;
        } catch (e) {
            console.error("Login error - backend may be unavailable:", e);
            // No fallback - backend must be running for authentication
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("casarefah_token");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};

