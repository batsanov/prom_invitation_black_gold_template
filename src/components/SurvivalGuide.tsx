import { motion } from 'framer-motion';
import { Footprints, Pill, Pizza, AlertCircle } from 'lucide-react';
import { promConfig } from '../config/promConfig';

const iconMap: Record<string, any> = {
    shoe: Footprints,
    pill: Pill,
    pizza: Pizza,
};

const SurvivalGuide = () => {
    return (
        <section id="survival-guide" className="py-20 bg-gradient-to-b from-[#151515] via-[#0f0f0f] to-[#131313] relative overflow-hidden">
            {/* Background overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/6 via-transparent to-gold/4" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="font-body text-gold/80 tracking-[0.3em] uppercase text-sm drop-shadow-md">
                        {promConfig.survivalGuide.subtitle}
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-white mt-4 drop-shadow-lg">
                        {promConfig.survivalGuide.title}
                    </h2>
                    <div className="w-24 h-px bg-gold/40 mx-auto mt-6 shadow-sm" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {promConfig.survivalGuide.items.map((item, index) => {
                        const Icon = iconMap[item.icon] || AlertCircle;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="relative group"
                            >
                                <div className="bg-gradient-to-br from-[#1f1f1f] to-[#151515] rounded-2xl p-8 shadow-xl border border-gold/15 h-full flex flex-col items-center text-center hover:shadow-gold/10 transition-all duration-300 hover:-translate-y-2">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-champagne/30 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="text-white w-8 h-8" strokeWidth={1.5} />
                                    </div>

                                    <p className="font-display text-xl text-white/90 leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SurvivalGuide;
