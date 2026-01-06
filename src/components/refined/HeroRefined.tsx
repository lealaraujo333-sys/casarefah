import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { useNavigate } from "react-router-dom";

// Import local video and fallback image
const peoniaVideo = "/products/peonia-reveal.mp4";
const heroImage = "/products/hero-zen-arrangement.png";

const HeroRefined = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#FDFCFC]">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-100 via-transparent to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* 1. Content Column */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <Reveal delay={0.1}>
                            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-foreground tracking-tight">
                                Casa Refah, criatividade,<br />
                                exclusividade e <span className="italic text-primary">sofisticação</span>.
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="text-xl text-muted-foreground font-light max-w-lg leading-relaxed">
                                Peças e velas feitas a mão, que unem estética, aromas e tendências em decoração.
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="flex gap-4 items-center pt-4">
                                <Button
                                    size="lg"
                                    className="rounded-full px-8 h-12 text-base group"
                                    onClick={() => navigate("/categoria/velas")}
                                >
                                    Ver Coleção
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full px-8 h-12 text-base"
                                    onClick={() => scrollToSection("nossa-historia")}
                                >
                                    Nossa História
                                </Button>
                            </div>
                        </Reveal>

                        {/* Stats / Trust indicators */}
                        <Reveal delay={0.4}>
                            <div className="flex gap-8 pt-8 border-t border-stone-100">
                                <div>
                                    <p className="font-serif text-2xl text-foreground">100%</p>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Artesanal</p>
                                </div>
                                <div>
                                    <p className="font-serif text-2xl text-foreground">Eco</p>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Friendly</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* 2. Visual Column (Video + Image) */}
                    <motion.div
                        style={{ y, opacity }}
                        className="relative order-1 lg:order-2 h-[500px] lg:h-[700px] w-full"
                    >
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-stone-900/10 z-10" /> {/* Overlay */}

                            {/* Primary Video Background */}
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster={heroImage}
                                className="object-cover w-full h-full opacity-0 animate-fade-in transition-opacity duration-700"
                                onLoadedData={(e) => e.currentTarget.classList.remove('opacity-0')}
                                onError={(e) => e.currentTarget.classList.remove('opacity-0')}
                            >
                                <source src={peoniaVideo} type="video/mp4" />
                            </video>

                            {/* Floating "Card" Effect */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/50 z-20 shadow-lg max-w-xs"
                            >
                                <p className="font-serif text-lg text-foreground italic mb-1">"O encanto da peônia"</p>
                                <p className="text-xs text-muted-foreground">Nova coleção disponível</p>
                            </motion.div>
                        </div>

                        {/* Decorative Circle behind */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-stone-200 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroRefined;
