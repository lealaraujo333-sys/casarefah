import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const heroCandles = "/products/hero-candles.jpg";
const collectionEssenza = "/products/collection-essenza.png";
const difusoraRefah = "/products/difusora-refah.png";

const SpotlightGrid = () => {
    const navigate = useNavigate();

    return (
        <section className="py-32 container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <Reveal>
                    <h2 className="font-serif text-5xl md:text-6xl text-foreground">
                        Coleção <span className="italic text-primary">Destaque</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="max-w-xs text-muted-foreground text-right border-l pl-4 border-foreground/10">
                        Uma curadoria de peças essenciais para transformar sua rotina em um ritual.
                    </p>
                </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                {/* Large Card 1 - Velas Aromáticas */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-secondary/10 cursor-pointer"
                    onClick={() => navigate("/categoria/velas")}
                >
                    <img
                        src={heroCandles}
                        alt="Velas Aromáticas"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                    <div className="absolute bottom-8 left-8 text-white">
                        <p className="uppercase tracking-widest text-xs font-medium mb-2">Best Seller</p>
                        <h3 className="font-serif text-4xl mb-4">Velas Aromáticas</h3>
                        <span className="flex items-center gap-2 text-sm border-b border-white pb-1 group-hover:pl-2 transition-all">
                            Comprar Agora <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </div>
                </motion.div>

                {/* Square Card 2 - New Arrivals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="relative group overflow-hidden rounded-3xl bg-[#E8E6E1] cursor-pointer"
                    onClick={() => navigate("/categoria/velas")}
                >
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center z-10 group-hover:opacity-0 transition-opacity duration-300">
                        <span className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center mb-4 text-foreground">
                            <ArrowUpRight className="w-5 h-5" />
                        </span>
                        <h3 className="font-serif text-3xl text-foreground">Novos <br /> Aromas</h3>
                        <p className="text-muted-foreground text-sm mt-2">Descubra a coleção de outono.</p>
                    </div>

                    <img
                        src={collectionEssenza}
                        alt="Novos Aromas"
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105"
                    />

                    <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wide">
                            Ver Lançamentos
                        </span>
                    </div>
                </motion.div>

                {/* Square Card 3 - Artisan Story */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative group overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 flex flex-col justify-between cursor-pointer"
                    onClick={() => {
                        const section = document.getElementById("testimonials");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                    }}
                >
                    <div>
                        <span className="opacity-60 text-xs uppercase tracking-widest">O Atelier</span>
                        <h3 className="font-serif text-3xl mt-2 leading-tight">Feito à mão com alma.</h3>
                    </div>

                    <p className="text-sm opacity-80 leading-relaxed">
                        Cada peça é única, moldada por mãos que respeitam o tempo e a matéria. Conheça nosso processo.
                    </p>

                    <ArrowUpRight className="absolute top-8 right-8 w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </motion.div>

                {/* Wide Card 4 - Difusores */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 md:col-start-2 relative group overflow-hidden rounded-3xl bg-white border border-border"
                >
                    <div className="grid grid-cols-2 h-full">
                        <div className="p-12 flex flex-col justify-center">
                            <span className="text-accent-foreground text-xs font-bold uppercase tracking-widest mb-2">Difusores</span>
                            <h3 className="font-serif text-4xl mb-6 text-foreground">Renove seu ambiente instantaneamente.</h3>
                            <Button
                                variant="outline"
                                className="w-fit rounded-full"
                                onClick={() => navigate("/categoria/difusores")}
                            >
                                Conhecer Linha
                            </Button>
                        </div>
                        <Link to="/categoria/difusores" className="h-full relative overflow-hidden">
                            <img
                                src={difusoraRefah}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Difusores"
                            />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
export default SpotlightGrid;

