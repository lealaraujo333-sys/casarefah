import { Button } from "@/components/ui/button";
import customImage from "@/assets/Florescer da Cerejeira.png";
import { Stamp } from "lucide-react";

const CustomOrdersSection = () => {
  const whatsappNumber = "5511984336900";
  const message = encodeURIComponent(
    "Olá! Gostaria de desenvolver produtos personalizados com a minha marca pela CASA REFAH."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
              Produtos sob demanda
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-foreground">
              Personalize velas, difusores e objetos com a sua identidade visual
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
              A CASA REFAH transforma a essência da sua marca em experiências
              olfativas exclusivas. Desenvolvemos blends autorais, pigmentações
              personalizadas e produção em pequena ou média escala com selo
              artesanal. Ideal para eventos, giftings corporativos e vendas
              sob assinatura.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Logos e identidades aplicadas em rótulos, tags e embalagens.",
                "Fragrâncias exclusivas criadas a partir de briefing sensorial.",
                "Peças em cimento nas suas paletas de cor e acabamentos.",
                "Gestão completa: protótipo, produção, embalagem e envio.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-secondary/30 bg-card/80 p-4 shadow-sm"
                >
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-secondary/20">
                    <Stamp className="h-4 w-4 text-secondary-foreground" />
                  </span>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/5"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Falar sobre produção personalizada
              </a>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-secondary/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-secondary/30 bg-card shadow-2xl">
              <img
                src={customImage}
                alt="Produtos personalizados CASA REFAH"
                className="h-full w-full object-cover"
              />
              <div className="absolute right-6 top-6 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-secondary-foreground">
                Sua logo aqui
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomOrdersSection;
