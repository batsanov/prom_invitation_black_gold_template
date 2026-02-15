import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { promConfig } from '../config/promConfig';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/90 backdrop-blur-md shadow-sm py-3 border-b border-fuchsia/10'
            : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-[2px] py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            {/* Logo */}
            <a
              href="#home"
              className={`font-display text-2xl transition-colors duration-300 drop-shadow-sm hover:text-fuchsia ${
                isScrolled ? 'text-deep-rose' : 'text-white'
              }`}
            >
              {promConfig.graduate.initials}
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
