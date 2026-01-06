import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";

const FooterRefined = () => {
    return (
        <footer className="bg-foreground text-background pt-24 pb-12">
            <div className="container mx-auto px-6">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    <div className="md:col-span-4 space-y-6">
                        <h3 className="font-serif text-2xl">Atendimento</h3>
                        <p className="text-white/60 font-light max-w-sm">
                            Dúvidas ou encomendas especiais? Nossa equipe está pronta para ajudar você a escolher o aroma perfeito.
                        </p>
                        <a href="mailto:contato@casarefah.com.br" className="inline-block text-white hover:text-primary transition-colors underline decoration-1 underline-offset-4">
                            contato@casarefah.com.br
                        </a>
                    </div>

                    <div className="md:col-span-2 md:col-start-7 space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-white/40">Shop</h4>
                        <ul className="space-y-3">
                            <li><Link to="/categoria/velas" className="text-white/80 hover:text-white transition-colors">Velas</Link></li>
                            <li><Link to="/categoria/difusores" className="text-white/80 hover:text-white transition-colors">Difusores</Link></li>
                            <li><Link to="/categoria/decor" className="text-white/80 hover:text-white transition-colors">Decor</Link></li>
                            <li><Link to="/categoria/kits" className="text-white/80 hover:text-white transition-colors">Kits Presente</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-white/40">Ajuda</h4>
                        <ul className="space-y-3">
                            <li><a href="mailto:contato@casarefah.com.br" className="text-white/80 hover:text-white transition-colors">Fale Conosco</a></li>
                            <li><a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">WhatsApp</a></li>
                            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Perguntas Frequentes</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-xs uppercase tracking-widest text-white/40">Social</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://instagram.com/casarefah"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Siga-nos no Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://facebook.com/casarefah"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Siga-nos no Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Giant Type */}
                <div className="border-t border-white/10 pt-12 flex flex-col items-center">
                    <h1 className="font-serif text-[clamp(3rem,15vw,12rem)] leading-none tracking-tighter text-white/10 select-none">
                        CASA REFAH
                    </h1>
                    <div className="flex w-full justify-between mt-8 text-xs text-white/30 uppercase tracking-widest">
                        <span>© 2024 Casa Refah</span>
                        <span>Feito com amor no Brasil</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterRefined;

