import { Instagram, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-cormorant text-2xl font-semibold tracking-wide">
              CASA REFAH
            </h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Criando momentos de paz e beleza através de produtos artesanais únicos.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#inicio" className="hover:text-primary-foreground transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#essenza" className="hover:text-primary-foreground transition-colors">
                  Essenza
                </a>
              </li>
              <li>
                <a href="#decor" className="hover:text-primary-foreground transition-colors">
                  Home & Decor
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider">
              Contato
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+5511984336900"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                (11) 98433-6900
              </a>
              <a
                href="https://instagram.com/casarefah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @casarefah
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} CASA REFAH. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
