import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/contexts/ProductContext";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductFormDialog from "@/components/admin/ProductFormDialog";
import { Product } from "@/types/product";
import { getImageUrl } from "@/lib/imageUrl";

const AdminProducts = () => {
    const { products, deleteProduct } = useProducts();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Handle navigation state from Dashboard "Novo Produto" button
    useEffect(() => {
        if (location.state?.openNewProduct) {
            setEditingProduct(null);
            setDialogOpen(true);
            // Clear the state so it doesn't re-trigger
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Tem certeza que deseja excluir ${name}?`)) {
            deleteProduct(id);
        }
    };

    const handleNewProduct = () => {
        setEditingProduct(null);
        setDialogOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setDialogOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif text-stone-900">Produtos</h2>
                    <p className="text-stone-500 text-sm mt-1">Gerencie seu catálogo, preços e estoque.</p>
                </div>
                <Button onClick={handleNewProduct} className="bg-stone-900 text-white hover:bg-stone-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                {/* Filters */}
                <div className="p-4 border-b border-stone-200 bg-stone-50/50">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <Input
                            placeholder="Buscar produtos..."
                            className="pl-9 bg-white border-stone-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-stone-50 border-b border-stone-200 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    <div className="col-span-5">Produto</div>
                    <div className="col-span-2">Categoria</div>
                    <div className="col-span-2">Preço</div>
                    <div className="col-span-2">Estoque</div>
                    <div className="col-span-1 text-right">Ações</div>
                </div>

                {/* List */}
                <div className="divide-y divide-stone-100">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-stone-50/50 transition-colors">
                            <div className="col-span-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0">
                                    <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-stone-900">{product.name}</h3>
                                    <span className="text-xs text-stone-400">ID: {product.id}</span>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-800 capitalize">
                                    {product.category}
                                </span>
                            </div>
                            <div className="col-span-2 text-sm font-medium text-stone-700">
                                R$ {product.price.toFixed(2).replace('.', ',')}
                            </div>
                            <div className="col-span-2">
                                {product.inStock ? (
                                    <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Ativo
                                    </span>
                                ) : (
                                    <span className="text-xs font-medium text-red-600 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Esgotado
                                    </span>
                                )}
                            </div>
                            <div className="col-span-1 flex justify-end gap-2">
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="p-2 hover:bg-stone-100 rounded-md text-stone-500 hover:text-stone-900 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id, product.name)}
                                    className="p-2 hover:bg-red-50 rounded-md text-stone-500 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="p-12 text-center text-stone-500">
                        Nenhum produto encontrado.
                    </div>
                )}
            </div>

            {/* Product Form Dialog */}
            <ProductFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                product={editingProduct}
            />
        </div>
    );
};

export default AdminProducts;

