import { Reveal } from "@/components/ui/Reveal";
import { Heart, Leaf, Sparkles } from "lucide-react";

const AboutSection = () => {
    return (
        <section id="nossa-historia" className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <Reveal>
                        <div className="relative mb-12 lg:mb-0">
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100">
                                <img
                                    src="/products/collection-essenza.png"
                                    alt="Atelier Casa Refah"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating Card */}
                            <div className="absolute bottom-4 right-4 bg-white rounded-2xl p-5 shadow-xl border border-stone-100 max-w-[180px]">
                                <p className="font-serif text-2xl text-primary mb-1">+230</p>
                                <p className="text-xs text-muted-foreground leading-tight">Kits entregues no último ano</p>
                            </div>
                        </div>
                    </Reveal>

                    {/* Content Side */}
                    <div className="space-y-8">
                        <Reveal delay={0.1}>
                            <span className="inline-block px-3 py-1 rounded-full border border-stone-200 bg-stone-50/50 text-xs font-medium tracking-widest uppercase text-stone-500">
                                Nossa História
                            </span>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground">
                                Cada peça é moldada com <span className="italic text-primary">amor e dedicação</span>
                            </h2>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                A Casa Refah nasceu do desejo de transformar momentos simples em experiências sensoriais únicas.
                                Nossas velas, difusores e peças decorativas são criadas artesanalmente, unindo técnica,
                                criatividade e matérias-primas de alta qualidade.
                            </p>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <p className="text-muted-foreground leading-relaxed">
                                Trabalhamos com ceras vegetais, essências premium e concreto artesanal,
                                sempre respeitando o meio ambiente e valorizando o trabalho manual.
                            </p>
                        </Reveal>

                        <Reveal delay={0.5}>
                            <div className="grid grid-cols-3 gap-6 pt-4">
                                <div className="text-center p-4 rounded-xl bg-stone-50">
                                    <Heart className="w-6 h-6 mx-auto mb-3 text-primary" />
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">100%</p>
                                    <p className="text-sm font-medium text-foreground">Artesanal</p>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-stone-50">
                                    <Leaf className="w-6 h-6 mx-auto mb-3 text-primary" />
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Ceras</p>
                                    <p className="text-sm font-medium text-foreground">Vegetais</p>
                                </div>
                                <div className="text-center p-4 rounded-xl bg-stone-50">
                                    <Sparkles className="w-6 h-6 mx-auto mb-3 text-primary" />
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Essências</p>
                                    <p className="text-sm font-medium text-foreground">Premium</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
