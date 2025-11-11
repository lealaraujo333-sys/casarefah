import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { getProductBySlug } from "@/data/products";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-cormorant mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate('/')}>Voltar à Página Inicial</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Adicionado ao carrinho",
      description: `${quantity}x ${product.name} adicionado ao seu carrinho.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-cormorant text-4xl sm:text-5xl font-light mb-4">
                {product.name}
              </h1>
              <p className="text-3xl text-primary font-semibold">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3 py-6 border-y border-border/50">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Disponibilidade:</span>
                <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                  {product.inStock ? "Em estoque" : "Esgotado"}
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantidade:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-muted-foreground space-y-2 pt-6">
              <p>✓ Produto artesanal feito à mão</p>
              <p>✓ Materiais naturais de alta qualidade</p>
              <p>✓ Cada peça é única</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
