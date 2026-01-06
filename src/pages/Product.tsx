import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import NavigationRefined from "@/components/NavigationRefined";
import FooterRefined from "@/components/FooterRefined";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Check, Package, Ruler, Leaf, ShieldCheck, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Reveal } from "@/components/ui/Reveal";

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductBySlug } = useProducts();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF9]">
        <NavigationRefined />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-serif mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate('/')} variant="outline">Voltar à Página Inicial</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Adicionado ao carrinho",
      description: `${quantity}x ${product.name} foi adicionado.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] selection:bg-stone-200">
      <NavigationRefined />

      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-24 md:py-32">
        {/* Breadcrumb / Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="group flex items-center text-sm text-stone-500 hover:text-stone-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para coleção
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Sticky Gallery */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="sticky top-32 rounded-3xl overflow-hidden bg-stone-100 shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover aspect-[4/5]"
              />
              {/* Floating Badge */}
              {product.featured && (
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest shadow-sm">
                  Destaque
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Product Info */}
          <div className="lg:col-span-5 flex flex-col h-full lg:pt-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B08D55]">
                  {product.category === 'decor' ? 'Decoração' :
                    product.category === 'velas' ? 'Velas Aromáticas' :
                      'Difusores & Aromas'}
                </span>
                {product.inStock ? (
                  <span className="flex items-center text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                    Em Estoque
                  </span>
                ) : (
                  <span className="flex items-center text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-full">
                    Esgotado
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6 leading-[1.1]">
                {product.name}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col gap-2 mb-8 pb-8 border-b border-stone-200">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl text-stone-900 font-light">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-stone-400 line-through font-serif">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-500">
                  Em até 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
                </p>
              </div>
            </Reveal>

            {/* Description Paragraph */}
            <Reveal delay={0.3}>
              <p className="text-lg text-stone-600 leading-relaxed mb-10 font-light">
                {product.description}
              </p>
            </Reveal>

            {/* Action Area */}
            <div className="mb-10 space-y-6">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-100 shadow-sm">
                <span className="text-sm font-medium text-stone-600">Quantidade</span>
                <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-white rounded-md transition-all disabled:opacity-50"
                    disabled={quantity <= 1}
                  > - </button>
                  <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-white rounded-md transition-all"
                  > + </button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full h-14 text-base bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-xl transition-all shadow-lg shadow-stone-900/10"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBagIcon className="w-5 h-5 mr-3" />
                {product.inStock ? 'Adicionar à Sacola' : 'Avise-me quando chegar'}
              </Button>
            </div>

            {/* Tabs for Rich Details */}
            <Tabs defaultValue={product.kitContents ? "kit" : "details"} className="w-full mb-12">
              <TabsList className="w-full justify-start bg-transparent border-b border-stone-200 p-0 h-auto rounded-none space-x-8">
                {product.kitContents && (
                  <TabsTrigger
                    value="kit"
                    className="rounded-none border-b-2 border-transparent px-0 py-3 data-[state=active]:border-stone-900 data-[state=active]:bg-transparent data-[state=active]:text-stone-900 text-stone-500 text-base font-serif"
                  >
                    O que vem no kit
                  </TabsTrigger>
                )}
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent px-0 py-3 data-[state=active]:border-stone-900 data-[state=active]:bg-transparent data-[state=active]:text-stone-900 text-stone-500 text-base font-serif"
                >
                  Detalhes & Dimensões
                </TabsTrigger>
                <TabsTrigger
                  value="care"
                  className="rounded-none border-b-2 border-transparent px-0 py-3 data-[state=active]:border-stone-900 data-[state=active]:bg-transparent data-[state=active]:text-stone-900 text-stone-500 text-base font-serif"
                >
                  Cuidados
                </TabsTrigger>
              </TabsList>

              {/* TAB: KIT CONTENTS */}
              {product.kitContents && (
                <TabsContent value="kit" className="pt-6">
                  <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                    <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#B08D55]" />
                      Montagem do Kit
                    </h3>
                    <ul className="space-y-4">
                      {product.kitContents.map((item, idx) => (
                        <motion.li
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={idx}
                          className="flex items-start gap-4 p-3 hover:bg-stone-50 rounded-lg transition-colors group"
                        >
                          <div className="mt-1 min-w-5">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#B08D55]/10 text-[#B08D55]">
                              <Check className="w-3 h-3" />
                            </span>
                          </div>
                          <span className="text-stone-700 leading-snug group-hover:text-stone-900">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              )}

              {/* TAB: DETAILS */}
              <TabsContent value="details" className="pt-6 space-y-8">
                <div className="prose prose-stone max-w-none text-stone-600">
                  <p>{product.details || product.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.dimensions && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-stone-100 rounded-full">
                        <Ruler className="w-5 h-5 text-stone-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-900">Dimensões</h4>
                        <p className="text-sm text-stone-500 mt-1">{product.dimensions}</p>
                      </div>
                    </div>
                  )}
                  {product.packaging && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-stone-100 rounded-full">
                        <Package className="w-5 h-5 text-stone-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-900">Embalagem</h4>
                        <p className="text-sm text-stone-500 mt-1">{product.packaging}</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* TAB: CARE */}
              <TabsContent value="care" className="pt-6">
                <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-stone-200/50">
                  <div className="flex items-start gap-4 mb-4">
                    <Leaf className="w-6 h-6 text-green-700/60" />
                    <div>
                      <h3 className="font-serif text-lg text-stone-900 mb-2">Como cuidar da sua peça</h3>
                      <p className="text-stone-600 leading-relaxed text-sm">
                        {product.care || "Limpar com pano seco. Evitar produtos abrasivos."}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-8 mt-auto">
              <div className="text-center">
                <div className="mx-auto w-10 h-10 flex items-center justify-center bg-stone-50 rounded-full mb-3">
                  <ShieldCheck className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-xs font-medium text-stone-900 uppercase tracking-wide">Compra Segura</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-10 h-10 flex items-center justify-center bg-stone-50 rounded-full mb-3">
                  <Truck className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-xs font-medium text-stone-900 uppercase tracking-wide">Entrega Garantida</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-10 h-10 flex items-center justify-center bg-stone-50 rounded-full mb-3">
                  <Leaf className="w-5 h-5 text-stone-400" />
                </div>
                <p className="text-xs font-medium text-stone-900 uppercase tracking-wide">Eco-Friendly</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterRefined />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 lg:hidden z-40 transform transition-transform pb-safe">
        <Button
          size="lg"
          className="w-full text-base"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          Adicionar • R$ {product.price.toFixed(2).replace('.', ',')}
        </Button>
      </div>

    </div>
  );
};

// Helper Icon Component
function ShoppingBagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export default Product;
