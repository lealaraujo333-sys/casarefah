import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero">
      <div className="text-center space-y-6 px-4">
        <h1 className="font-cormorant text-6xl sm:text-8xl font-light text-foreground">404</h1>
        <p className="text-xl sm:text-2xl text-muted-foreground">Página não encontrada</p>
        <p className="text-base text-muted-foreground max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col items-center gap-6">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            <a href="/" className="flex items-center gap-2 font-serif tracking-wider">
              <Home className="h-4 w-4" />
              VOLTAR AO INÍCIO
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
