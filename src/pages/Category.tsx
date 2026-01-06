import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/contexts/ProductContext";
import NavigationRefined from "@/components/NavigationRefined";
import FooterRefined from "@/components/FooterRefined";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const categoryInfo: Record<string, { title: string; description: string }> = {
  // ... (keep logic same, just change imports)
  essenza: {
    title: "Coleção Essenza",
    description: "Nossa linha assinatura de velas e aromas que definem a identidade da Casa Refah",
  },
  decor: {
    title: "Home & Decor",
    description:
      "Objetos de cimento feitos à mão, bandejas e vasos para adicionar elegância minimalista",
  },
  dharma: {
    title: "Dharma",
    description:
      "Cristais, budas e itens espirituais para cultivar paz interior e harmonia",
  },
  velas: {
    title: "Velas Aromáticas",
    description: "Ilumine e perfume seu ambiente com nossas velas artesanais de cera vegetal",
  },
  difusores: {
    title: "Difusores de Ambiente",
    description: "Fragrâncias contínuas e sofisticadas para manter sua casa sempre acolhedora",
  },
  "home-spray": {
    title: "Home Sprays",
    description: "Frescor imediato e aromas marcantes com apenas algumas borrifadas",
  },
  kits: {
    title: "Kits Presente",
    description: "Conjuntos especiais que combinam velas, difusores e peças decorativas para presentear com elegância",
  },
};

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { getProductsByCategory } = useProducts();
  const products = getProductsByCategory(category || "");
  const info = categoryInfo[category || ""];

  if (!info) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationRefined />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-cormorant mb-4">
            Categoria não encontrada
          </h1>
          <Button onClick={() => navigate("/")}>Voltar à Página Inicial</Button>
        </div>
        <FooterRefined />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationRefined />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-cormorant text-4xl sm:text-5xl font-light text-foreground mb-4">
            {info.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {info.description}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </main>

      <FooterRefined />
    </div>
  );
};

export default Category;
