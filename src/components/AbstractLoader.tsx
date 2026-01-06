import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
    onComplete?: () => void;
}

const AbstractLoader = ({ onComplete }: LoaderProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onComplete?.(), 800); // Wait for exit animation
        }, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#FDFCFC]"
            initial={{ opacity: 1 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ pointerEvents: isVisible ? "all" : "none" }}
        >
            <div className="relative flex flex-col items-center">
                <div className="relative w-24 h-24 mb-6">
                    {/* Abstract petal shapes blooming */}
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute top-0 left-0 w-full h-full border border-[#8E7C68]/30 rounded-[50%_0_50%_0]"
                            initial={{ scale: 0, rotate: i * 45, opacity: 0 }}
                            animate={{ scale: 1, rotate: i * 45 + 180, opacity: 1 }}
                            transition={{
                                duration: 1.5,
                                ease: [0.22, 1, 0.36, 1],
                                delay: i * 0.15
                            }}
                        />
                    ))}
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={`inner-${i}`}
                            className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-[#8E7C68]/10 rounded-[50%_0_50%_0]"
                            initial={{ scale: 0, rotate: i * 45, opacity: 0 }}
                            animate={{ scale: 1, rotate: i * 45 + 180, opacity: 1 }}
                            transition={{
                                duration: 1.5,
                                ease: "easeOut",
                                delay: 0.4 + i * 0.1
                            }}
                        />
                    ))}
                </div>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="font-serif text-2xl tracking-widest text-[#1A1918]"
                    >
                        CASA REFAH
                    </motion.h1>
                </div>
            </div>
        </motion.div>
    );
};

export default AbstractLoader;
