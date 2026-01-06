import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimerReset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/ProductContext";

type TimeLeft = {
  hours: string;
  minutes: string;
  seconds: string;
};

const calculateTimeLeft = (target: Date): TimeLeft => {
  const totalMs = target.getTime() - new Date().getTime();
  const clamped = totalMs > 0 ? totalMs : 0;
  const hours = Math.floor(clamped / (1000 * 60 * 60));
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

const PromoSpotlight = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const flashSaleUntil = useMemo(
    () => new Date(Date.now() + 1000 * 60 * 60 * 36),
    []
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(flashSaleUntil)
  );
  const promotionalProducts = useMemo(
    () =>
      products
        .filter(
          (product) =>
            product.originalPrice && product.originalPrice > product.price
        )
        .slice(0, 4),
    [products]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(flashSaleUntil));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [flashSaleUntil]);

  const whatsappNumber = "5511984336900";
  const whatsappPromoMessage = encodeURIComponent(
    "Olá! Quero aproveitar as promoções da CASA REFAH."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappPromoMessage}`;

  return (
    <section className="relative overflow-hidden bg-muted/40 py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 via-white to-emerald-50/40" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Promoção relâmpago
            </span>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-foreground">
              Mais Pedidas !
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
              Garanta agora os best-sellers da CASA REFAH com preços especiais
              por tempo limitado.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200/70 bg-white/80 px-6 py-5 text-center shadow-lg backdrop-blur">
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <TimerReset className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                termina em
              </span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 font-semibold text-2xl sm:text-3xl text-foreground">
              <div>
                {timeLeft.hours}
                <span className="block text-xs font-normal uppercase tracking-[0.3em] text-muted-foreground">
                  horas
                </span>
              </div>
              <span>:</span>
              <div>
                {timeLeft.minutes}
                <span className="block text-xs font-normal uppercase tracking-[0.3em] text-muted-foreground">
                  minutos
                </span>
              </div>
              <span>:</span>
              <div>
                {timeLeft.seconds}
                <span className="block text-xs font-normal uppercase tracking-[0.3em] text-muted-foreground">
                  segundos
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {promotionalProducts.map((product, index) => {
            const discount =
              product.originalPrice && product.originalPrice > product.price
                ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                  100
                )
                : 0;

            return (
              <div
                key={product.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {discount > 0 && (
                    <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow">
                      -{discount}%
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 text-sm">
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through">
                        De R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                    <span className="text-xl font-semibold text-emerald-600">
                      Por R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-emerald-600">
                      estoque limitado
                    </span>
                  </div>

                  <div className="mt-auto flex flex-col gap-2">
                    <Button
                      className="bg-emerald-500 hover:bg-emerald-500/90"
                      onClick={() => navigate(`/produto/${product.slug}`)}
                    >
                      Ver detalhes
                    </Button>
                    <Button
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                      asChild
                    >
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Reservar pelo WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoSpotlight;
