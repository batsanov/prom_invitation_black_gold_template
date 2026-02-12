import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { promConfig } from '../config/promConfig';

const PanicButton = () => {
    const [isPanicMode, setIsPanicMode] = useState(false);

    return (
        <section className="py-24 bg-charcoal relative overflow-hidden flex justify-center items-center">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: 10 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                    className="mb-8 text-white/50 text-sm uppercase tracking-widest"
                >
                    ↓ Натисни бутона ↓
                </motion.div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPanicMode(true)}
                    className="relative group"
                >
                    {/* Button Glow */}
                    <div className="absolute inset-0 bg-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />

                    {/* Main Button */}
                    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-[0_0_50px_rgba(220,38,38,0.4)] border-4 border-red-400/30 flex flex-col items-center justify-center gap-2 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />

                        <AlertTriangle className="text-white w-12 h-12 md:w-16 md:h-16 drop-shadow-md relative z-10" />
                        <span className="font-display text-white text-xl md:text-2xl tracking-widest font-bold drop-shadow-md relative z-10">
                            {promConfig.panicButton.label}
                        </span>
                    </div>
                </motion.button>

                <p className="mt-8 text-white/30 text-sm uppercase tracking-widest">
                    (Само за спешни случаи)
                </p>
            </div>

            {/* Panic Overlay */}
            <AnimatePresence>
                {isPanicMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            className="bg-gradient-to-br from-charcoal to-black border border-gold/20 p-8 md:p-12 rounded-3xl max-w-2xl text-center relative shadow-2xl"
                        >
                            <button
                                onClick={() => setIsPanicMode(false)}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-6 inline-flex p-4 rounded-full bg-green-500/10 text-green-400 mb-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                >
                                    <AlertTriangle size={48} />
                                </motion.div>
                            </div>

                            <h3 className="font-display text-2xl md:text-4xl text-white leading-relaxed drop-shadow-lg">
                                {promConfig.panicButton.message}
                            </h3>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8"
                            >
                                <button
                                    onClick={() => setIsPanicMode(false)}
                                    className="px-8 py-3 bg-white text-charcoal font-display text-lg rounded-full hover:bg-gold hover:text-white transition-colors duration-300 shadow-lg"
                                >
                                    Разбрах, идвам!
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PanicButton;
