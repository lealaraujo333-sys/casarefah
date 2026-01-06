import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import NavigationRefined from "@/components/NavigationRefined";
import FooterRefined from "@/components/FooterRefined";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lock, Truck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // Masks
  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2")
      .slice(0, 15);
  };

  const maskZip = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === "phone") formattedValue = maskPhone(value);
    if (id === "zipcode") formattedValue = maskZip(value);

    setFormData(prev => ({ ...prev, [id]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Create WhatsApp message
    const whatsappNumber = "5511984336900";

    // Build a beautiful order message
    let message = `🌿 *CASA REFAH*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `✨ *NOVO PEDIDO*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Products section
    message += `🛍️ *ITENS DO PEDIDO*\n\n`;
    items.forEach((item) => {
      const itemTotal = (item.price * item.quantity).toFixed(2).replace('.', ',');
      message += `   ▸ ${item.name}\n`;
      message += `      Qtd: ${item.quantity} × R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
      if (item.quantity > 1) {
        message += `      Subtotal: R$ ${itemTotal}\n`;
      }
      message += `\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL: R$ ${totalPrice.toFixed(2).replace('.', ',')}*\n`;
    message += `📦 Frete: A combinar\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Customer information
    message += `👤 *CLIENTE*\n\n`;
    message += `   Nome: ${formData.name}\n`;
    message += `   WhatsApp: ${formData.phone}\n`;
    message += `   Email: ${formData.email}\n\n`;

    // Address
    message += `📍 *ENDEREÇO DE ENTREGA*\n\n`;
    message += `   ${formData.street}, ${formData.number}\n`;
    if (formData.complement) {
      message += `   ${formData.complement}\n`;
    }
    message += `   ${formData.neighborhood}\n`;
    message += `   ${formData.city}\n`;
    message += `   CEP: ${formData.zipcode}\n\n`;

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🕐 Aguardando confirmação\n`;
    message += `━━━━━━━━━━━━━━━━━━━━`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Helper timeout for better UX
    setTimeout(() => {
      window.open(whatsappLink, '_blank');
      clearCart();
      toast({
        title: "Pedido Redirecionado!",
        description: "Finalize o pagamento com nosso consultor no WhatsApp.",
        duration: 5000,
      });
      navigate('/');
      setIsProcessing(false);
    }, 1500);
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FDFCFC]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-stone-50 via-white to-transparent pointer-events-none" />
      <NavigationRefined />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/carrinho')}
            className="pl-0 text-muted-foreground hover:text-foreground hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Carrinho
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10">
                <span className="text-secondary tracking-widest uppercase text-xs font-semibold">Checkout Seguro</span>
                <h1 className="font-serif text-4xl mt-2 text-foreground">Finalizar Compra</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Contact Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-stone-100">
                    <div className="bg-stone-100 p-2 rounded-full"><Lock className="w-4 h-4 text-stone-500" /></div>
                    <h2 className="font-medium text-lg">Dados de Contato</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" value={formData.name} onChange={handleInputChange} required className="h-12 bg-white/50" placeholder="Ex: Ana Silva" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">WhatsApp</Label>
                      <Input id="phone" value={formData.phone} onChange={handleInputChange} required className="h-12 bg-white/50" placeholder="(00) 00000-0000" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required className="h-12 bg-white/50" placeholder="seu@email.com" />
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-2 border-b border-stone-100">
                    <div className="bg-stone-100 p-2 rounded-full"><Truck className="w-4 h-4 text-stone-500" /></div>
                    <h2 className="font-medium text-lg">Endereço de Entrega</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 space-y-2">
                        <Label htmlFor="zipcode">CEP</Label>
                        <Input id="zipcode" value={formData.zipcode} onChange={handleInputChange} required className="h-12 bg-white/50" placeholder="00000-000" />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="street">Rua</Label>
                        <Input id="street" value={formData.street} onChange={handleInputChange} required className="h-12 bg-white/50" />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1 space-y-2">
                        <Label htmlFor="number">Número</Label>
                        <Input id="number" value={formData.number} onChange={handleInputChange} required className="h-12 bg-white/50" />
                      </div>
                      <div className="col-span-3 space-y-2">
                        <Label htmlFor="complement">Complemento <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                        <Input id="complement" value={formData.complement} onChange={handleInputChange} className="h-12 bg-white/50" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input id="neighborhood" value={formData.neighborhood} onChange={handleInputChange} required className="h-12 bg-white/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade/UF</Label>
                        <Input id="city" value={formData.city} onChange={handleInputChange} required className="h-12 bg-white/50" />
                      </div>
                    </div>

                    {/* Hidden state input for simplicity, or could be part of city input */}
                    <input type="hidden" id="state" value={formData.city} />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-base rounded-xl mt-8 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Processando...
                    </div>
                  ) : (
                    'Confirmar Pedido no WhatsApp'
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Ao clicar, você será redirecionado para o WhatsApp para combinar o pagamento.
                </p>

              </form>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-stone-900 text-stone-50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <CreditCard className="w-5 h-5 text-secondary" />
                  <h3 className="font-serif text-2xl">Resumo do Pedido</h3>
                </div>

                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start">
                      <div className="w-16 h-16 rounded-lg bg-stone-800 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-stone-200">{item.name}</p>
                        <p className="text-sm text-stone-400">Qtd: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-secondary">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-800 my-6 pt-6 space-y-3">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal</span>
                    <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Frete</span>
                    <span className="text-xs border border-stone-700 rounded px-2 py-1">A calcular</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-stone-800 pt-6">
                  <div>
                    <span className="text-sm text-stone-400">Total</span>
                    <p className="text-xs text-stone-500 mt-1">Em até 3x sem juros</p>
                  </div>
                  <span className="font-serif text-4xl text-white">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Secure Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-stone-400 text-sm">
                <Lock className="w-3 h-3" />
                <span>Ambiente criptografado e seguro</span>
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      <FooterRefined />
    </div>
  );
};

export default Checkout;
