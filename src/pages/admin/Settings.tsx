import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Store, Bell, Shield, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getAuthHeaders = () => {
    const token = localStorage.getItem("casarefah_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

interface SettingsData {
    storeName: string;
    whatsapp: string;
    email: string;
    notifyNewOrders: string;
    notifyLowStock: string;
}

const AdminSettings = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<SettingsData>({
        storeName: "Casa Refah",
        whatsapp: "(11) 99999-9999",
        email: "contato@casarefah.com",
        notifyNewOrders: "false",
        notifyLowStock: "false"
    });
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Handle unauthorized - redirect to login
    const handleUnauthorized = () => {
        toast({
            title: "Sessão expirada",
            description: "Por favor, faça login novamente.",
            variant: "destructive"
        });
        logout();
        navigate("/admin/login");
    };

    // Fetch settings on mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${API_URL}/settings`, {
                    headers: getAuthHeaders()
                });
                if (res.status === 401) {
                    handleUnauthorized();
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    setSettings(data);
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error);
                // Use defaults silently if backend is unavailable
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/settings`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify(settings)
            });

            if (res.ok) {
                toast({
                    title: "Configurações salvas",
                    description: "Suas preferências foram atualizadas com sucesso.",
                });
            } else {
                throw new Error("Failed to save");
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível salvar as configurações.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast({
                title: "Erro",
                description: "As senhas não coincidem.",
                variant: "destructive"
            });
            return;
        }

        if (passwords.newPassword.length < 6) {
            toast({
                title: "Erro",
                description: "A nova senha deve ter pelo menos 6 caracteres.",
                variant: "destructive"
            });
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/settings/password`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                })
            });

            if (res.ok) {
                toast({
                    title: "Senha alterada",
                    description: "Sua senha foi alterada com sucesso.",
                });
                setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                const error = await res.json();
                toast({
                    title: "Erro",
                    description: error.error || "Não foi possível alterar a senha.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível alterar a senha.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    const toggleNotification = (key: "notifyNewOrders" | "notifyLowStock") => {
        setSettings(prev => ({
            ...prev,
            [key]: prev[key] === "true" ? "false" : "true"
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif text-stone-900">Configurações</h2>
                <p className="text-stone-500 text-sm mt-1">Gerencie as configurações do sistema.</p>
            </div>

            <div className="grid gap-6">
                {/* Store Info */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Store className="w-5 h-5 text-stone-600" />
                            <CardTitle>Informações da Loja</CardTitle>
                        </div>
                        <CardDescription>Dados básicos da Casa Refah</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="storeName">Nome da Loja</Label>
                                <Input
                                    id="storeName"
                                    value={settings.storeName}
                                    onChange={(e) => setSettings(prev => ({ ...prev, storeName: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp</Label>
                                <Input
                                    id="whatsapp"
                                    value={settings.whatsapp}
                                    onChange={(e) => setSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email de Contato</Label>
                            <Input
                                id="email"
                                type="email"
                                value={settings.email}
                                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="w-5 h-5 text-stone-600" />
                            <CardTitle>Notificações</CardTitle>
                        </div>
                        <CardDescription>Preferências de alertas e notificações</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Novos Pedidos</p>
                                    <p className="text-xs text-stone-500">Receber alerta por email a cada pedido</p>
                                </div>
                                <Button
                                    variant={settings.notifyNewOrders === "true" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleNotification("notifyNewOrders")}
                                >
                                    {settings.notifyNewOrders === "true" ? "Ativo" : "Inativo"}
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Estoque Baixo</p>
                                    <p className="text-xs text-stone-500">Alerta quando produto esgota</p>
                                </div>
                                <Button
                                    variant={settings.notifyLowStock === "true" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleNotification("notifyLowStock")}
                                >
                                    {settings.notifyLowStock === "true" ? "Ativo" : "Inativo"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-stone-600" />
                            <CardTitle>Segurança</CardTitle>
                        </div>
                        <CardDescription>Configurações de acesso ao painel</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Senha Atual</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                placeholder="••••••••"
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords(prev => ({ ...prev, currentPassword: e.target.value }))}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Nova Senha</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                />
                            </div>
                        </div>
                        <Button
                            onClick={handleChangePassword}
                            variant="outline"
                            disabled={saving || !passwords.currentPassword || !passwords.newPassword}
                        >
                            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Shield className="w-4 h-4 mr-2" />}
                            Alterar Senha
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-stone-900 hover:bg-stone-800" disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Settings className="w-4 h-4 mr-2" />}
                    Salvar Configurações
                </Button>
            </div>
        </div>
    );
};

export default AdminSettings;

