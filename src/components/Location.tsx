import { motion } from 'framer-motion';
import { promConfig } from '../config/promConfig';

const Location = () => {
  return (
    <section id="location" className="py-24 bg-ivory relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-blush)_0%,_transparent_50%)] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-dusty-rose tracking-[0.3em] uppercase text-sm font-bold">
            {promConfig.location.title}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-deep-rose mt-4 drop-shadow-sm">
            {promConfig.location.city}
          </h2>
          <div className="w-24 h-px bg-fuchsia/30 mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl border border-dusty-rose/20"
        >
          <div className="relative">
            <div className="h-[450px] md:h-[500px]">
              <img
                src={promConfig.location.image}
                alt="Beautiful Landscape"
                className="w-full h-full object-cover"
              />
              {/* Image overlay for consistency with Hero */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-rose/40 via-transparent to-deep-rose/10 mix-blend-multiply" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
