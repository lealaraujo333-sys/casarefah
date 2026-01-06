import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/ProductContext";
import { Product } from "@/types/product";
import { ArrowUpRight, ChevronRight } from "lucide-react";

const whatsappNumber = "5511984336900";

const buildWhatsAppLink = (product: Product) => {
  const message = encodeURIComponent(
    `Olá! Tenho interesse no produto ${product.name} (ID ${product.id}). Poderia me enviar mais detalhes?`
  );
  return `https://wa.me/${whatsappNumber}?text=${message}`;
};

const ProductShowcaseTabs = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState<"destaques" | "catalogo">(
    "destaques"
  );

  const featuredProducts = useMemo(() => products.filter(p => p.featured), [products]);
  const catalogProducts = useMemo(() => products, [products]);

  const handleOpenCatalog = () => setActiveTab("catalogo");

  const handleContactProduct = (product: Product) => {
    window.open(buildWhatsAppLink(product), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              coleções casa refah
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-foreground">
              Descubra nossas peças autorais
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
              Escolha entre os destaques do momento ou mergulhe no catálogo
              completo da CASA REFAH. Cada peça acompanha ficha técnica com
              detalhes de acabamento e cuidados sugeridos.
            </p>
          </div>

          <Button
            variant="ghost"
            className="self-start text-sm text-primary hover:text-primary/90"
            onClick={handleOpenCatalog}
          >
            Ver catálogo completo
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "destaques" | "catalogo")}
          className="mt-10"
        >
          <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:min-w-[400px]">
            <TabsTrigger value="destaques">Seleção Essencial</TabsTrigger>
            <TabsTrigger value="catalogo">Catálogo Completo</TabsTrigger>
          </TabsList>

          <TabsContent value="destaques" className="mt-8 focus-visible:outline-none">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex h-full flex-col rounded-3xl border border-border/60 bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {product.originalPrice && (
                      <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground">
                        Promoção
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      {product.originalPrice && (
                        <span className="text-muted-foreground line-through">
                          R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                      <span className="text-lg font-semibold text-primary">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <div className="mt-auto flex flex-col gap-2">
                      <Button onClick={() => navigate(`/produto/${product.slug}`)}>
                        Ver detalhes
                      </Button>
                      <Button
                        variant="outline"
                        className="border-primary/40 text-primary hover:bg-primary/5"
                        onClick={() => handleContactProduct(product)}
                      >
                        Consultar via WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                className="gap-2"
                onClick={handleOpenCatalog}
              >
                Ver mais produtos
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="catalogo" className="mt-10 focus-visible:outline-none">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {catalogProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleContactProduct(product)}
                  className="group flex h-full flex-col rounded-3xl border border-border/60 bg-card p-6 text-left shadow-md transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                        {product.name}
                      </h3>
                      <span className="mt-1 inline-block rounded-full bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-secondary-foreground/80">
                        {product.category === "decor" ? "Home Decor" : product.category}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                    {product.description}
                  </p>
                  <div className="mt-6 flex flex-col gap-2 text-sm">
                    <span className="font-semibold text-primary">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <span className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Conversar no WhatsApp
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductShowcaseTabs;
