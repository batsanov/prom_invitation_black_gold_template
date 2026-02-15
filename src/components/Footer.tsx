import { motion } from 'framer-motion';
import { Sparkles, Phone } from 'lucide-react';
import { promConfig } from '../config/promConfig';

const Footer = () => {
  return (
    <footer className="bg-ivory relative overflow-hidden py-16">
      {/* Soft decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blush/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Name */}
          <h2 className="font-display text-3xl md:text-4xl text-deep-rose mb-2">
            {promConfig.graduate.name}
          </h2>
          <p className="font-display text-fuchsia text-lg mb-4">
            {promConfig.graduate.classOf}
          </p>
          <p className="font-body text-muted-rose mb-8">
            {promConfig.date.displayDate} • {promConfig.location.city.split(',')[0]}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-fuchsia/30" />
            <Sparkles className="text-fuchsia" size={20} />
            <div className="w-16 h-px bg-fuchsia/30" />
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a
              href={`tel:${promConfig.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-deep-rose hover:text-fuchsia transition-colors duration-300"
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
                className="font-body text-muted-rose hover:text-deep-rose transition-colors text-sm uppercase tracking-wider font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Hashtag */}
          <p className="font-display italic text-fuchsia/80 text-xl mb-8">
            {promConfig.graduate.hashtag}
          </p>

          {/* Copyright */}
          <p className="font-body text-muted-rose/60 text-sm">
            © {promConfig.date.year} {promConfig.graduate.name}. {promConfig.footer.copyrightMeta}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
