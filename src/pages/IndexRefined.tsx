import NavigationRefined from "@/components/NavigationRefined";
import FooterRefined from "@/components/FooterRefined";
import HeroRefined from "@/components/refined/HeroRefined";
import PhilosophyTicker from "@/components/refined/PhilosophyTicker";
import SpotlightGrid from "@/components/refined/SpotlightGrid";
import TestimonialsSection from "@/components/refined/TestimonialsSection";
import AboutSection from "@/components/refined/AboutSection";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "react-router-dom";
import { useProducts } from "@/contexts/ProductContext";
import { getImageUrl } from "@/lib/imageUrl";

// This is the new high-fidelity home page
const IndexRefined = () => {
    const { products } = useProducts();

    return (
        <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
            <NavigationRefined />

            <main>
                <HeroRefined />
                <PhilosophyTicker />
                <SpotlightGrid />

                {/* Placeholder for Product Carousel - "Curated" */}
                <section className="py-24 container mx-auto px-6 border-t border-border">
                    <Reveal width="100%">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="font-serif text-4xl md:text-5xl">Favoritos da Semana</h2>
                            <p className="text-muted-foreground">As escolhas mais amadas pela nossa comunidade.</p>
                        </div>
                    </Reveal>

                    {/* Real Product Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-10 gap-y-12 lg:gap-y-16">
                        {products.slice(0, 8).map((product) => (
                            <Link to={`/produto/${product.slug}`} key={product.id} className="group cursor-pointer">
                                <div className="aspect-[3/4] bg-stone-100 rounded-xl overflow-hidden mb-6 relative">
                                    <img
                                        src={getImageUrl(product.image)}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                        alt={product.name}
                                    />
                                    {/* Glass Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Quick Badge */}
                                    {!product.inStock && (
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                            Esgotado
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <h3 className="font-serif text-xl leading-tight text-stone-800 group-hover:text-stone-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm">
                                        <p className="text-stone-900 font-medium">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                                        {product.originalPrice && (
                                            <p className="text-stone-400 line-through text-xs">R$ {product.originalPrice.toFixed(2).replace('.', ',')}</p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <AboutSection />
                <TestimonialsSection />
            </main>

            <FooterRefined />
        </div>
    );
};

export default IndexRefined;

