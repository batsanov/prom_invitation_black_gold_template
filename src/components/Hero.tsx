import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { promConfig } from '../config/promConfig';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={promConfig.hero.bgImage.desktop}
          />
          <img
            src={promConfig.hero.bgImage.mobile}
            alt="Prom background"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Rose-tinted overlay for luxurious pink theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-deep-rose/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 -mt-18">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12"
        >
          <span className="font-body text-blush font-bold tracking-[0.3em] uppercase text-xl md:text-xl lg:text-2xl drop-shadow-md">
            {promConfig.hero.subtitle}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-4 drop-shadow-lg"
        >
          <span className="block italic">{promConfig.graduate.name}</span>
          <span className="block text-2xl md:text-3xl mt-4 text-blush/90 font-light tracking-normal uppercase">{promConfig.graduate.classOf}</span>
        </motion.h1>
      </div>

      {/* Date + divider */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 text-center w-full"
      >
        <div className="w-24 h-px bg-blush/80 mx-auto mb-6 shadow-sm" />
        <p className="font-display text-xl md:text-2xl text-soft-white tracking-wide drop-shadow-md">
          {promConfig.date.displayDate}
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <a href="#countdown" className="text-blush hover:text-white transition-colors duration-300">
            <ChevronDown size={32} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
