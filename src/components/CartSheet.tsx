import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartSheet = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-cormorant text-2xl">Seu Carrinho</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border/50">
                    <div className="w-20 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 -mt-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-primary font-semibold text-sm mb-2">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border/50 pt-4 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
