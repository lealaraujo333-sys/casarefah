const heroImage = "/products/hero-zen-arrangement.png";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { Clock3, Leaf, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const highlightFeatures = useMemo(
    () => [
      {
        icon: Sparkles,
        title: "100% personalizados",
        description: "Escolha a cor e aroma da forma que preferir.",
      },
      {
        icon: Leaf,
        title: "Feitas a mão",
        description: "Peças moldadas, lixadas e seladas manualmente em nosso ateliê.",
      },
      {
        icon: Clock3,
        title: "O presente perfeito",
        description: "Produção sob demanda ideal para presentes corporativos e eventos.",
      },
    ],
    []
  );

  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Coleção aromática artesanal CASA REFAH"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl space-y-4 sm:space-y-6 text-left animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/30 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-md backdrop-blur">
              Artesanatos e Velas Aromáticas
            </span>

            <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_60%)] leading-tight">
              Casa Refah velas artesanais que unem estética, fragrância e serenidade.
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed [text-shadow:_0_1px_8px_rgb(0_0_0_/_50%)]">
              Velas, difusores e peças artesanais feitas para
              iluminar e perfumar seu ambiente. Personalizamos fragrâncias, cores e
              acabamentos para traduzir a sua identidade em forma de arte.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-medium hover:shadow-glow transition-all duration-300 px-6 sm:px-8 text-sm sm:text-base"
                onClick={() => navigate("/categoria/essenza")}
              >
                Ver Produtos
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/60 bg-white/10 px-6 sm:px-8 text-white hover:bg-white/20 hover:text-white text-sm sm:text-base"
                onClick={() => {
                  const essenzaSection = document.getElementById("essenza");
                  essenzaSection?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Montar meu kit Essenza
              </Button>
            </div>

            <div className="grid gap-3 pt-4 grid-cols-1 sm:grid-cols-3">
              {highlightFeatures.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-xl sm:rounded-2xl border border-white/40 bg-black/30 p-3 sm:p-4 text-white shadow-lg backdrop-blur"
                >
                  <div className="mb-2 sm:mb-3 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/20">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                    {title}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs text-white/95 [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in-up hidden lg:block" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -top-10 right-0 hidden rounded-3xl border border-white/50 bg-black/40 px-6 py-4 text-right text-white shadow-xl backdrop-blur lg:block">
              <p className="text-xs uppercase tracking-[0.4em] text-white/90 [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                Kits Entregues
              </p>
              <p className="text-3xl font-semibold [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">+230</p>
              <p className="text-xs text-white/90 [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">Eventos e ativações no último ano</p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/10 shadow-2xl backdrop-blur">
              <img
                src={heroImage}
                alt="Coleção aromática artesanal CASA REFAH"
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background/60" />

              <div className="absolute top-6 left-6 rounded-2xl border border-white/50 bg-black/40 px-4 py-3 text-xs font-medium uppercase tracking-[0.3em] text-white shadow-lg backdrop-blur [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                Produção 100% artesanal
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="rounded-2xl bg-background/80 p-6 text-left text-sm text-foreground shadow-xl backdrop-blur">
                  <p className="text-muted-foreground text-[0.65rem] uppercase tracking-[0.3em] font-semibold">
                    Personalize com sua marca
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">
                    Presentes aromáticos para encantar clientes e equipes
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cores exclusivas, rótulos sob medida e blends que contam histórias.
                    A equipe acompanha do briefing à entrega final.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                      MOQ 20 unidades
                    </span>
                    <span className="rounded-full bg-secondary/20 px-3 py-1">
                      Personalizado
                    </span>
                    <span className="rounded-full bg-emerald-100/60 px-3 py-1 text-emerald-700">
                      Entrega nacional
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary/30 p-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
