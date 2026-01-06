import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types/product";
import { useProducts } from "@/contexts/ProductContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, Image as ImageIcon, Check, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ProductFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product?: Product | null;
}

interface ProductImage {
    name: string;
    path: string;
    url: string;
}

const categories = [
    { value: "velas", label: "Velas" },
    { value: "difusores", label: "Difusores" },
    { value: "kits", label: "Kits" },
    { value: "decor", label: "Decor" },
    { value: "home-spray", label: "Home Spray" },
];

const ProductFormDialog = ({ open, onOpenChange, product }: ProductFormDialogProps) => {
    const { addProduct, updateProduct } = useProducts();
    const { toast } = useToast();
    const { getToken } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEditing = !!product;

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        price: "",
        originalPrice: "",
        description: "",
        image: "",
        category: "velas",
        inStock: true,
        dimensions: "",
        packaging: "",
        details: "",
        care: "",
    });

    const [availableImages, setAvailableImages] = useState<ProductImage[]>([]);
    const [loadingImages, setLoadingImages] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showImageSelector, setShowImageSelector] = useState(false);

    // Fetch available images
    const fetchImages = async () => {
        setLoadingImages(true);
        try {
            const token = getToken();
            const res = await fetch(`${API_URL}/images`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const images = await res.json();
                setAvailableImages(images);
            }
        } catch (e) {
            console.error("Error fetching images:", e);
        } finally {
            setLoadingImages(false);
        }
    };

    // Handle image upload
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const token = getToken();
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(`${API_URL}/images/upload`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({ ...prev, image: data.path }));
                toast({ title: "Upload concluído!", description: "Imagem carregada com sucesso." });
                fetchImages(); // Refresh list
            } else {
                const error = await res.json();
                toast({ title: "Erro no upload", description: error.error, variant: "destructive" });
            }
        } catch (e) {
            toast({ title: "Erro", description: "Falha ao fazer upload", variant: "destructive" });
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // Load product data when editing
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                slug: product.slug || "",
                price: product.price?.toString() || "",
                originalPrice: product.originalPrice?.toString() || "",
                description: product.description || "",
                image: product.image || "",
                category: product.category || "velas",
                inStock: product.inStock ?? true,
                dimensions: product.dimensions || "",
                packaging: product.packaging || "",
                details: product.details || "",
                care: product.care || "",
            });
        } else {
            setFormData({
                name: "",
                slug: "",
                price: "",
                originalPrice: "",
                description: "",
                image: "",
                category: "velas",
                inStock: true,
                dimensions: "",
                packaging: "",
                details: "",
                care: "",
            });
        }
    }, [product, open]);

    // Fetch images when dialog opens
    useEffect(() => {
        if (open) {
            fetchImages();
        }
    }, [open]);

    // Auto-generate slug from name
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData(prev => ({
            ...prev,
            name,
            slug: generateSlug(name)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate image path starts with /products/ for security
        if (formData.image && !formData.image.startsWith("/products/")) {
            toast({
                title: "URL inválida",
                description: "A imagem deve estar na pasta /products/",
                variant: "destructive"
            });
            return;
        }

        const productData: Product = {
            id: product?.id || `${Date.now()}`,
            name: formData.name,
            slug: formData.slug,
            price: parseFloat(formData.price) || 0,
            originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
            description: formData.description,
            image: formData.image || "/products/placeholder.png",
            category: formData.category,
            inStock: formData.inStock,
            dimensions: formData.dimensions || undefined,
            packaging: formData.packaging || undefined,
            details: formData.details || undefined,
            care: formData.care || undefined,
        };

        if (isEditing && product) {
            updateProduct(product.id, productData);
            toast({
                title: "Produto Atualizado!",
                description: `${productData.name} foi atualizado com sucesso.`,
            });
        } else {
            addProduct(productData);
            toast({
                title: "Produto Criado!",
                description: `${productData.name} foi adicionado ao catálogo.`,
            });
        }

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">
                        {isEditing ? "Editar Produto" : "Novo Produto"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome do Produto *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleNameChange}
                                required
                                placeholder="Ex: Vela Florescer da Cerejeira"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL)</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                placeholder="florescer-da-cerejeira"
                            />
                        </div>
                    </div>

                    {/* Price & Category */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Preço (R$) *</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                required
                                placeholder="129.90"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="originalPrice">Preço Original (opcional)</Label>
                            <Input
                                id="originalPrice"
                                type="number"
                                step="0.01"
                                value={formData.originalPrice}
                                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                                placeholder="159.90"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Categoria *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            required
                            rows={3}
                            placeholder="Descreva o produto..."
                        />
                    </div>

                    {/* Image Section - Enhanced */}
                    <div className="space-y-3">
                        <Label>Imagem do Produto *</Label>

                        {/* Current Image Preview */}
                        {formData.image && (
                            <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-lg">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-16 h-16 rounded-lg object-cover border"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{formData.image.split("/").pop()}</p>
                                    <p className="text-xs text-muted-foreground">{formData.image}</p>
                                </div>
                            </div>
                        )}

                        {/* Upload and Select Buttons */}
                        <div className="flex gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleUpload}
                                accept="image/png,image/jpeg,image/webp,image/gif"
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="flex-1"
                            >
                                {uploading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
                                ) : (
                                    <><Upload className="mr-2 h-4 w-4" /> Fazer Upload</>
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowImageSelector(!showImageSelector)}
                                className="flex-1"
                            >
                                <ImageIcon className="mr-2 h-4 w-4" />
                                {showImageSelector ? "Ocultar Galeria" : "Escolher Existente"}
                            </Button>
                        </div>

                        {/* Image Selector Grid */}
                        {showImageSelector && (
                            <div className="border rounded-lg p-3 max-h-48 overflow-y-auto">
                                {loadingImages ? (
                                    <div className="flex items-center justify-center py-4">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    </div>
                                ) : availableImages.length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        Nenhuma imagem encontrada. Faça upload primeiro.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-6 gap-2">
                                        {availableImages.map((img) => (
                                            <button
                                                type="button"
                                                key={img.path}
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, image: img.path }));
                                                    setShowImageSelector(false);
                                                }}
                                                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-primary ${formData.image === img.path ? "border-primary ring-2 ring-primary/20" : "border-transparent"
                                                    }`}
                                            >
                                                <img
                                                    src={img.path}
                                                    alt={img.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {formData.image === img.path && (
                                                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                        <Check className="h-5 w-5 text-primary" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Manual URL Input */}
                        <div className="flex gap-2">
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                placeholder="/products/nome-do-produto.png"
                                className="flex-1"
                            />
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dimensions">Dimensões</Label>
                            <Input
                                id="dimensions"
                                value={formData.dimensions}
                                onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                                placeholder="10cm x 8cm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="packaging">Embalagem</Label>
                            <Input
                                id="packaging"
                                value={formData.packaging}
                                onChange={(e) => setFormData(prev => ({ ...prev, packaging: e.target.value }))}
                                placeholder="Caixa kraft premium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="details">Detalhes Adicionais</Label>
                        <Textarea
                            id="details"
                            value={formData.details}
                            onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                            rows={2}
                            placeholder="Informações extras sobre o produto..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="care">Cuidados</Label>
                        <Textarea
                            id="care"
                            value={formData.care}
                            onChange={(e) => setFormData(prev => ({ ...prev, care: e.target.value }))}
                            rows={2}
                            placeholder="Instruções de cuidado..."
                        />
                    </div>

                    {/* Stock Toggle */}
                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                        <div>
                            <Label htmlFor="inStock" className="text-base font-medium">Em Estoque</Label>
                            <p className="text-sm text-muted-foreground">O produto está disponível para venda?</p>
                        </div>
                        <Switch
                            id="inStock"
                            checked={formData.inStock}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-stone-900 hover:bg-stone-800">
                            {isEditing ? "Salvar Alterações" : "Criar Produto"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductFormDialog;
