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
        <Button 
          asChild
          size="lg"
          className="mt-6"
        >
          <a href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Voltar ao Início
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
