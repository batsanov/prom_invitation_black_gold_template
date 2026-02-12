import { motion } from 'framer-motion';
import { promConfig } from '../config/promConfig';

const Location = () => {
  return (
    <section id="location" className="py-20 bg-gradient-to-b from-[#181818] via-[#101010] to-[#141414] relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-gold/6" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-gold/80 tracking-[0.3em] uppercase text-sm drop-shadow-md">
            {promConfig.location.title}
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-4 drop-shadow-lg">
            {promConfig.location.city}
          </h2>
          <div className="w-24 h-px bg-gold/40 mx-auto mt-6 shadow-sm" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/15"
        >
          <div className="relative">
            <div className="h-[450px] md:h-[500px]">
              <img
                src={promConfig.location.image}
                alt="Beautiful Landscape"
                className="w-full h-full object-cover"
              />
              {/* Image overlay for consistency with Hero */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
