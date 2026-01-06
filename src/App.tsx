import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import CartSheet from "@/components/CartSheet";
import ScrollToTop from "@/components/ScrollToTop";
import IndexRefined from "./pages/IndexRefined";
import IndexLegacy from "./pages/Index";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminSettings from "./pages/admin/Settings";
import AdminLogin from "./pages/admin/Login";
import RequireAuth from "./components/admin/RequireAuth";
import { ProductProvider } from "./contexts/ProductContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <CartSheet />
                <Routes>
                  <Route path="/" element={<IndexRefined />} />
                  <Route path="/legacy" element={<IndexLegacy />} />
                  <Route path="/produto/:slug" element={<Product />} />
                  <Route path="/categoria/:category" element={<Category />} />
                  <Route path="/carrinho" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />

                  <Route path="/admin" element={<RequireAuth />}>
                    <Route element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="products" element={<AdminProducts />} />
                      <Route path="settings" element={<AdminSettings />} />
                    </Route>
                  </Route>

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

