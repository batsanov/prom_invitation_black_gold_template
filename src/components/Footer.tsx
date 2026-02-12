import { motion } from 'framer-motion';
import { Sparkles, Phone } from 'lucide-react';
import { promConfig } from '../config/promConfig';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-charcoal via-charcoal to-black py-16 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-frangipani/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Name */}
          <h2 className="font-display text-3xl md:text-4xl text-white mb-2 drop-shadow-md">
            {promConfig.graduate.name}
          </h2>
          <p className="font-display text-gold text-lg mb-4 drop-shadow-sm">
            {promConfig.graduate.classOf}
          </p>
          <p className="font-body text-white/70 mb-8">
            {promConfig.date.displayDate} • {promConfig.location.city.split(',')[0]}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gold/50" />
            <Sparkles className="text-gold" size={20} />
            <div className="w-16 h-px bg-gold/50" />
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a
              href={`tel:${promConfig.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors"
            >
              <Phone size={18} />
              <span className="font-body">{promConfig.contact.phone}</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {promConfig.footer.navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                className="font-body text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-wider"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Hashtag */}
          <p className="font-display italic text-gold text-xl mb-8 drop-shadow-md">
            {promConfig.graduate.hashtag}
          </p>

          {/* Copyright */}
          <p className="font-body text-white/30 text-sm">
            © {promConfig.date.year} {promConfig.graduate.name}. {promConfig.footer.copyrightMeta}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
