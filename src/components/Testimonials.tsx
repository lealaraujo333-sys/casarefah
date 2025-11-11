import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      text: "As velas da CASA REFAH transformaram completamente o ambiente da minha casa. A qualidade é excepcional e o aroma é suave e duradouro.",
      rating: 4,
    },
    {
      name: "João Santos",
      text: "Produtos lindos e de altíssima qualidade. A bandeja de cimento é uma obra de arte! Atendimento impecável.",
      rating: 4.5,
    },
    {
      name: "Ana Costa",
      text: "Comprei o kit de cristais e me apaixonei. Cada peça é escolhida com cuidado. Recomendo muito!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-foreground mb-4">
            O Que Dizem Nossos Clientes
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Experiências reais de quem já transformou seu lar com CASA REFAH
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="p-6 sm:p-8 border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-medium transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => {
                  const fillLevel = Math.max(0, Math.min(1, testimonial.rating - i));

                  return (
                    <div key={i} className="relative h-4 w-4 text-amber-200">
                      <Star className="h-4 w-4" />
                      {fillLevel > 0 && (
                        <div
                          className="absolute inset-0 overflow-hidden text-amber-400"
                          style={{ width: `${fillLevel * 100}%` }}
                        >
                          <Star className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
                <span className="ml-2 text-sm font-medium text-amber-500">
                  {Number.isInteger(testimonial.rating)
                    ? `${testimonial.rating},0`
                    : testimonial.rating.toString().replace('.', ',')}
                </span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <p className="font-medium text-foreground">
                {testimonial.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
