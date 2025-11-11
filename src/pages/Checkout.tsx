import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Create WhatsApp message with cart items
    const whatsappNumber = "5511984336900";

    let message = `*🛒 NOVO PEDIDO - CASA REFAH*\n\n`;
    message += `*📋 Informações do Cliente:*\n`;
    message += `Nome: ${formData.name}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Telefone: ${formData.phone}\n\n`;

    message += `*📦 Itens do Pedido:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qtd: ${item.quantity}x | Valor: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
      message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    message += `*💰 Valor Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}*\n\n`;

    message += `*📍 Endereço de Entrega:*\n`;
    message += `${formData.street}, ${formData.number}`;
    if (formData.complement) message += ` - ${formData.complement}`;
    message += `\n${formData.neighborhood} - ${formData.city}/${formData.state}\n`;
    message += `CEP: ${formData.zipcode}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');

    // Clear cart and show success message
    setTimeout(() => {
      clearCart();
      toast({
        title: "Pedido enviado!",
        description: "Seu pedido foi enviado via WhatsApp. Aguarde nosso contato!",
      });
      navigate('/');
      setIsProcessing(false);
    }, 1000);
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <Button
          variant="ghost"
          onClick={() => navigate('/carrinho')}
          className="mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Carrinho
        </Button>

        <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-light mb-8 sm:mb-12">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="font-cormorant text-2xl">Informações de Contato</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-4">
              <h2 className="font-cormorant text-2xl">Endereço de Entrega</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3">
                    <Label htmlFor="street">Rua</Label>
                    <Input id="street" value={formData.street} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="number">Número</Label>
                    <Input id="number" value={formData.number} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input id="complement" value={formData.complement} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input id="neighborhood" value={formData.neighborhood} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Input id="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="zipcode">CEP</Label>
                    <Input id="zipcode" value={formData.zipcode} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h2 className="font-cormorant text-xl sm:text-2xl">Forma de Pagamento</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Ao confirmar, você será redirecionado para o WhatsApp para finalizar o pagamento e combinar a entrega.
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full text-sm sm:text-base h-11 sm:h-12"
              disabled={isProcessing}
            >
              {isProcessing ? 'Enviando...' : '📱 Enviar Pedido via WhatsApp'}
            </Button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border/50 rounded-lg p-4 sm:p-6 bg-card lg:sticky lg:top-24">
              <h2 className="font-cormorant text-xl sm:text-2xl mb-4 sm:mb-6">Resumo</h2>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs sm:text-sm gap-2">
                    <span className="text-muted-foreground line-clamp-1">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium whitespace-nowrap">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/50 pt-3 sm:pt-4">
                <div className="flex justify-between text-base sm:text-lg font-semibold mb-2">
                  <span>Total</span>
                  <span className="text-primary">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  * Frete calculado após confirmação do endereço
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
