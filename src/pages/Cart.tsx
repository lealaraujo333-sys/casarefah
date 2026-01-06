import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import NavigationRefined from "@/components/NavigationRefined";
import FooterRefined from "@/components/FooterRefined";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFCFC] flex flex-col">
        <NavigationRefined />
        <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6"
          >
            <ShoppingBag className="h-10 w-10 text-stone-400" />
          </motion.div>

          <h1 className="font-serif text-4xl mb-4 text-foreground">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-8 max-w-md font-light">
            Parece que você ainda não escolheu seus produtos favoritos. Explore nossa coleção e leve o melhor da Casa Refah para o seu lar.
          </p>
          <Button onClick={() => navigate('/')} size="lg" className="rounded-full px-8">
            Explorar Coleção
          </Button>
        </div>
        <FooterRefined />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFC]">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-100/50 via-transparent to-transparent pointer-events-none" />

      <NavigationRefined />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-12">
            Carrinho de Compras
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="group bg-white/60 backdrop-blur-md border border-stone-200/60 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex gap-6 items-center"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                          {item.category || "Decor"}
                        </span>
                        <h3 className="font-serif text-xl text-foreground">{item.name}</h3>
                        <p className="text-secondary font-medium">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center bg-stone-100 rounded-full p-1 border border-stone-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium tabular-nums">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <span className="block text-sm font-medium text-foreground">
                            R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/80 backdrop-blur-xl border border-stone-200 shadow-xl shadow-stone-200/50 rounded-2xl p-8">
                  <h2 className="font-serif text-2xl mb-8">Resumo</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Entrega</span>
                      <span className="text-xs bg-stone-100 px-2 py-1 rounded">Calculado no checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-stone-100 pt-6 mb-8">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-medium">Total</span>
                      <span className="font-serif text-3xl text-primary">
                        R$ {totalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Ou em até 3x de R$ {(totalPrice / 3).toFixed(2).replace('.', ',')} sem juros
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 text-base rounded-xl mb-4 group transition-all hover:scale-[1.02] hover:shadow-lg"
                    onClick={() => navigate('/checkout')}
                  >
                    Finalizar Compra
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-foreground"
                    onClick={() => navigate('/')}
                  >
                    Continuar Comprando
                  </Button>
                </div>

                <div className="mt-6 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Trust Badges could go here (Safe Checkout, etc) - keeping it clean for now */}
                  <span className="text-xs text-center text-muted-foreground">
                    Compra 100% Segura e Garantida
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <FooterRefined />
    </div>
  );
};

export default Cart;
