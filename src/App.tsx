import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import CartSheet from "@/components/CartSheet";
import CandleLoader from "@/components/CandleLoader";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simulate initial load time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoaderComplete = () => {
    // Wait for candle blow-out animation to complete
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  };

  if (showLoader) {
    return <CandleLoader isLoading={isLoading} onComplete={handleLoaderComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CartSheet />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/produto/:slug" element={<Product />} />
              <Route path="/categoria/:category" element={<Category />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
