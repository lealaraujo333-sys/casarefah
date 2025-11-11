import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  const handleCardClick = () => {
    navigate(`/produto/${product.slug}`);
  };

  return (
    <Card
      className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-medium bg-card cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleCardClick}
    >
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-sm sm:text-base text-muted-foreground font-medium">Esgotado</span>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
        <div>
          <h3 className="text-sm sm:text-base font-medium text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-1 sm:pt-2 gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-base sm:text-lg font-semibold text-primary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="hover:bg-primary/90 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Adicionar</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
