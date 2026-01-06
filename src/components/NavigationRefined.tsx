import { useState, useEffect } from "react";
import { Menu, ShoppingBag, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavigationRefined = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { totalItems: cartCount, setIsOpen: setIsCartOpen } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Left: Mobile Menu & Search */}
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6 text-foreground" />
                            </Button>
                        </SheetTrigger>
                        {/* @ts-ignore */}
                        <SheetContent side="left" className="w-[300px] bg-background border-r border-border">
                            <div className="flex flex-col gap-8 mt-12">
                                <Link to="/" className="text-2xl font-serif italic text-foreground">
                                    Home
                                </Link>
                                <div className="flex flex-col gap-4">
                                    <span className="text-sm uppercase tracking-widest text-muted-foreground">Coleções</span>
                                    <Link to="/categoria/velas" className="text-lg text-foreground hover:text-primary transition-colors">
                                        Velas Aromáticas
                                    </Link>
                                    <Link to="/categoria/difusores" className="text-lg text-foreground hover:text-primary transition-colors">
                                        Difusores
                                    </Link>
                                    <Link to="/categoria/kits" className="text-lg text-foreground hover:text-primary transition-colors">
                                        Kits Presente
                                    </Link>
                                    <Link to="/categoria/decor" className="text-lg text-foreground hover:text-primary transition-colors">
                                        Decor
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/categoria/velas" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
                            VELAS
                        </Link>
                        <Link to="/categoria/difusores" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
                            DIFUSORES
                        </Link>
                        <Link to="/categoria/kits" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
                            KITS
                        </Link>
                        <Link to="/categoria/decor" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
                            DECOR
                        </Link>
                    </div>
                </div>

                {/* Center: Logo */}
                <Link to="/" className="absolute left-1/2 -translate-x-1/2">
                    <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
                        CASA REFAH
                    </h1>
                </Link>

                {/* Right: Cart & Account */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <Search className="h-5 w-5 text-foreground" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingBag className="h-5 w-5 text-foreground" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-white flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default NavigationRefined;
