import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WhatsAppIcon = () => (
  <svg
    className="h-5 w-5 fill-current"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path d="M16.027 4.16c-6.488 0-11.78 5.272-11.78 11.74 0 2.069.545 4.087 1.585 5.872L4 28l6.43-1.66a11.73 11.73 0 0 0 5.597 1.43h.003c6.485 0 11.778-5.272 11.778-11.74 0-3.138-1.226-6.086-3.453-8.303a11.72 11.72 0 0 0-8.328-3.567Zm0 21.18h-.003a9.37 9.37 0 0 1-4.776-1.312l-.342-.203-3.814.984 1.02-3.716-.223-.381a9.356 9.356 0 0 1-1.386-4.832c0-5.16 4.208-9.356 9.38-9.356a9.31 9.31 0 0 1 6.628 2.737 9.332 9.332 0 0 1 2.734 6.62c0 5.16-4.206 9.359-9.218 9.359Zm5.34-7.019c-.292-.147-1.73-.855-1.998-.949-.266-.098-.461-.147-.654.147-.192.292-.748.953-.916 1.146-.17.195-.338.22-.63.073-.292-.146-1.232-.454-2.35-1.45-.868-.77-1.452-1.723-1.623-2.014-.17-.293-.018-.451.13-.598.134-.133.293-.346.438-.519.147-.172.195-.293.293-.487.099-.194.047-.366-.024-.512-.072-.146-.654-1.576-.897-2.16-.236-.568-.476-.492-.654-.5-.17-.007-.365-.009-.559-.009-.194 0-.512.073-.78.366-.267.293-1.02.996-1.02 2.43s1.043 2.82 1.188 3.016c.146.195 2.053 3.132 4.975 4.387.696.301 1.24.48 1.663.615.698.222 1.333.19 1.836.115.56-.083 1.73-.707 1.977-1.39.243-.683.243-1.267.17-1.39-.072-.122-.265-.195-.557-.341Z" />
  </svg>
);

const Navigation = () => {
  const navigate = useNavigate();
  const whatsappNumber = "5511984336900";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre a CASA REFAH.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="font-cormorant text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide text-foreground hover:text-primary transition-colors"
          >
            CASA REFAH
          </a>

          <Button
            asChild
            size="default"
            className="h-9 sm:h-10 lg:h-11 bg-gradient-to-r from-emerald-500 via-emerald-500/90 to-teal-500 hover:from-emerald-500/90 hover:via-emerald-500 hover:to-teal-500 text-white shadow-medium hover:shadow-glow transition-all px-3 sm:px-4"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 font-medium"
            >
              <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-white/15">
                <WhatsAppIcon />
              </span>
              <span className="text-xs sm:text-sm lg:text-base hidden xs:inline">Falar no WhatsApp</span>
              <span className="text-xs sm:text-sm lg:text-base xs:hidden">WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
