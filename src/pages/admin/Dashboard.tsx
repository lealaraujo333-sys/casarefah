import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/contexts/ProductContext";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Package, ShoppingBag, TrendingUp, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const { products } = useProducts();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [lastUpdate, setLastUpdate] = useState("");

    // Calculate real stats
    const totalProducts = products.length;
    const inStockProducts = products.filter(p => p.inStock).length;
    const totalStockValue = products.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = totalProducts > 0 ? totalStockValue / totalProducts : 0;

    // Set last update time
    useEffect(() => {
        const now = new Date();
        setLastUpdate(now.toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }));
    }, [products]);

    const handleNewProduct = () => {
        navigate("/admin/products", { state: { openNewProduct: true } });
    };

    const handleFinancialReport = () => {
        toast({
            title: "Relatório em Desenvolvimento",
            description: "Esta funcionalidade estará disponível em breve.",
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif text-stone-900">Visão Geral</h2>
                <div className="text-sm text-stone-500">Última atualização: {lastUpdate}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor do Catálogo</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {totalStockValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground">Soma dos preços de todos os produtos</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inStockProducts} <span className="text-sm font-normal text-muted-foreground">/ {totalProducts}</span></div>
                        <p className="text-xs text-muted-foreground">Em estoque / Total cadastrado</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {averagePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground">Média por produto</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categorias</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{new Set(products.map(p => p.category)).size}</div>
                        <p className="text-xs text-muted-foreground">Categorias ativas</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Categories Breakdown */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <h3 className="font-serif text-xl mb-4 text-stone-900">Produtos por Categoria</h3>
                    <div className="space-y-3">
                        {Object.entries(
                            products.reduce((acc, p) => {
                                acc[p.category] = (acc[p.category] || 0) + 1;
                                return acc;
                            }, {} as Record<string, number>)
                        ).map(([category, count]) => (
                            <div key={category} className="flex items-center justify-between border-b border-stone-100 pb-3 last:border-0">
                                <span className="text-sm capitalize text-stone-700">{category}</span>
                                <span className="text-sm font-medium text-stone-900 bg-stone-100 px-3 py-1 rounded-full">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <h3 className="font-serif text-xl mb-4 text-stone-900">Ações Rápidas</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleNewProduct}
                            className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors text-left group"
                        >
                            <span className="block mb-2 group-hover:scale-110 transition-transform origin-left">
                                <Package className="w-5 h-5 text-stone-800" />
                            </span>
                            <span className="text-sm font-medium text-stone-900">Novo Produto</span>
                        </button>
                        <button
                            onClick={handleFinancialReport}
                            className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors text-left group"
                        >
                            <span className="block mb-2 group-hover:scale-110 transition-transform origin-left">
                                <FileText className="w-5 h-5 text-stone-800" />
                            </span>
                            <span className="text-sm font-medium text-stone-900">Relatório Financeiro</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

