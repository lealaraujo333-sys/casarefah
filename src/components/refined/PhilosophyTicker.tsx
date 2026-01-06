import { motion } from "framer-motion";

const PhilosophyTicker = () => {
    const items = [
        "Feito à mão no Brasil",
        "Ceras Vegetais",
        "Cruelty Free",
        "Design Minimalista",
        "Essências Premium",
        "Embalagens Recicláveis"
    ];

    return (
        <div className="w-full py-6 bg-foreground overflow-hidden border-y border-white/5 relative z-20">
            <div className="flex whitespace-nowrap">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                    className="flex gap-16 items-center pr-16"
                >
                    {[...items, ...items, ...items].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-white/80 font-serif italic text-2xl tracking-wide">{item}</span>
                            <div className="w-2 h-2 rounded-full bg-primary/50" />
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                    className="flex gap-16 items-center pr-16"
                >
                    {[...items, ...items, ...items].map((item, i) => (
                        <div key={i + 100} className="flex items-center gap-4">
                            <span className="text-white/80 font-serif italic text-2xl tracking-wide">{item}</span>
                            <div className="w-2 h-2 rounded-full bg-primary/50" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default PhilosophyTicker;
