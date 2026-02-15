import { motion } from 'framer-motion';
import { Footprints, Pill, Pizza, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { promConfig } from '../config/promConfig';

const iconMap: Record<string, LucideIcon> = {
    shoe: Footprints,
    pill: Pill,
    pizza: Pizza,
};

const SurvivalGuide = () => {
    return (
        <section id="survival-guide" className="py-24 bg-ivory relative overflow-hidden">
            {/* Background overlay for depth */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blush/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-fuchsia/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="font-body text-dusty-rose tracking-[0.3em] uppercase text-sm font-bold">
                        {promConfig.survivalGuide.subtitle}
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-deep-rose mt-4 drop-shadow-sm">
                        {promConfig.survivalGuide.title}
                    </h2>
                    <div className="w-24 h-px bg-fuchsia/30 mx-auto mt-6" />
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
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-dusty-rose/20 h-full flex flex-col items-center text-center hover:shadow-fuchsia/10 hover:border-fuchsia/30 transition-all duration-300 hover:-translate-y-2">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blush/30 to-ivory flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="text-fuchsia w-8 h-8" strokeWidth={1.5} />
                                    </div>

                                    <p className="font-display text-xl text-deep-rose leading-relaxed">
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
