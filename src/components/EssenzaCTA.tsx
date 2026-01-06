import { Button } from "@/components/ui/button";
const essenzaImage = "/products/collection-essenza.png";
import { ArrowUpRight } from "lucide-react";

const EssenzaCTA = () => {
  const whatsappNumber = "5511984336900";
  const message = encodeURIComponent(
    "Olá! Quero montar um kit Essenza personalizado com a CASA REFAH."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section
      id="essenza"
      className="relative overflow-hidden bg-muted/30 py-16 sm:py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-white to-secondary/10" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Essenza by CASA REFAH
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-foreground">
              Monte um kit Essenza sob medida para o seu momento
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
              Combine velas, difusores e objetos decorativos em um kit exclusivo.
              Selecionamos fragrâncias, tons e acabamentos que representem sua
              identidade, seja para presentear pessoas queridas, equipes ou
              clientes especiais.
            </p>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="rounded-2xl border border-primary/20 bg-white/70 px-4 py-3">
                Assinamos etiquetas e tags com a sua logo.
              </li>
              <li className="rounded-2xl border border-primary/20 bg-white/70 px-4 py-3">
                Seleção de aromas autorais com briefing sensorial.
              </li>
              <li className="rounded-2xl border border-primary/20 bg-white/70 px-4 py-3">
                Kits a partir de 12 unidades com embalagem premium.
              </li>
              <li className="rounded-2xl border border-primary/20 bg-white/70 px-4 py-3">
                Envio para todo o Brasil com acompanhamento dedicado.
              </li>
            </ul>
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Montar meu kit agora
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-white shadow-xl">
              <img
                src={essenzaImage}
                alt="Itens Essenza personalizáveis"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-6 text-sm text-muted-foreground">
                <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary">
                  Kits Personalizados
                </p>
                <p className="mt-2">
                  Misture aromas calmantes, peças em cimento e acessórios que
                  contam a história da sua marca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EssenzaCTA;
