import { Heart, Leaf, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Feito com Amor",
      description: "Cada produto é criado à mão com atenção aos detalhes e muito carinho",
    },
    {
      icon: Leaf,
      title: "Sustentável",
      description: "Utilizamos materiais naturais e processos que respeitam o meio ambiente",
    },
    {
      icon: Sparkles,
      title: "Bem-Estar",
      description: "Nossos produtos são pensados para trazer paz e harmonia ao seu lar",
    },
  ];

  return (
    <section id="sobre" className="py-16 sm:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-foreground mb-6">
              Nossa História
            </h2>
            <p className="text-lg text-foreground/90 leading-relaxed mb-4">
              A CASA REFAH nasceu do desejo de criar produtos que transformam ambientes em santuários de paz e beleza.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Cada vela, difusor e objeto decorativo é cuidadosamente elaborado à mão, unindo técnicas artesanais 
              tradicionais com um design minimalista contemporâneo. Acreditamos que os pequenos detalhes fazem toda 
              a diferença na criação de um lar acolhedor e harmonioso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="text-center space-y-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/30 text-accent-foreground">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-cormorant text-2xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
