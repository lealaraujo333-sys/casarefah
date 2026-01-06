import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/contexts/ProductContext";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.featured);
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-foreground mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Descubra nossos best-sellers, feitos à mão com amor e dedicação
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:border-primary hover:bg-primary/5"
            onClick={() => navigate('/categoria/essenza')}
          >
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
