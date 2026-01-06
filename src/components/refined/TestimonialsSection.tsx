import { Reveal } from "@/components/ui/Reveal";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Maria Santos",
        role: "Cliente Verificada",
        content: "Uso os produtos Casa Refah há mais de um ano e não poderia estar mais feliz. A qualidade é excepcional e adoro saber que estou causando um impacto positivo no meio ambiente.",
        rating: 5,
    },
    {
        id: 2,
        name: "Carlos Mendes",
        role: "Cliente Verificado",
        content: "O sistema de refil é genial! É muito fácil de usar e reduziu significativamente a quantidade de lixo plástico em nossa casa. Além disso, os produtos cheiram maravilhosamente bem.",
        rating: 5,
    },
    {
        id: 3,
        name: "Ana Rodrigues",
        role: "Cliente Verificada",
        content: "Finalmente uma marca que realmente se preocupa com a sustentabilidade sem comprometer a qualidade. Minha família inteira adora a coleção de sabonetes para as mãos!",
        rating: 5,
    },
];

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="py-24 bg-stone-50 overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Reveal>
                    <div className="w-full text-center mb-16">
                        <span className="block text-primary text-sm font-medium tracking-widest uppercase mb-4">
                            Depoimentos
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                            O que dizem nossos clientes
                        </h2>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Reveal key={testimonial.id} delay={index * 0.15}>
                            <div className="bg-background/80 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 relative group">
                                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>

                                <p className="text-muted-foreground leading-relaxed mb-8 italic relative z-10">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                                    <div className="h-10 w-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-serif font-bold text-lg">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
