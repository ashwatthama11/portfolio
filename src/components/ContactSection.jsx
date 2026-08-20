import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, FileText, Instagram, Linkedin, Facebook } from 'lucide-react';
import BlueprintGrid from './BlueprintGrid';
import QuoteModal from './QuoteModal';

export default function ContactSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const socialHandles = [
    {
      name: 'Instagram',
      handle: '@amanvermaarchitect',
      href: 'https://www.instagram.com/amanvermaarchitect/',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      handle: 'AR. Aman Verma',
      href: 'https://www.linkedin.com/in/aman-verma-57ab69243/',
      icon: Linkedin,
    },
    {
      name: 'Facebook',
      handle: 'onenessaman',
      href: 'https://www.facebook.com/onenessaman/',
      icon: Facebook,
    }
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-36 bg-white overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <BlueprintGrid className="absolute inset-0 z-0 opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black">
            Start Your Journey
          </div>

          <h2 className="font-serif text-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            Let's Build Something Beautiful Together
          </h2>

          <p className="text-black/70 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto px-2">
            Ready to start your next architectural project? Request a detailed quote or connect with us directly.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg sm:max-w-none mx-auto">
            {/* Primary Get Quote Button */}
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full sm:w-auto flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90 transition-all duration-300 border border-[#FF7A00] min-w-0 sm:min-w-[200px] justify-center shadow-lg hover:shadow-[#FF7A00]/30 font-medium group cursor-pointer text-sm sm:text-base"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Get a Quote</span>
            </button>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/916265597717?text=Hi%20AR.%20Aman%20Verma,%20I%20would%20like%20to%20inquire%20about%20architectural%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-black text-white hover:bg-neutral-800 transition-all duration-300 border border-black min-w-0 sm:min-w-[190px] justify-center shadow font-medium group text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>WhatsApp Us</span>
            </a>

            {/* Email CTA */}
            <a
              href="mailto:amanvermaarchitect@gmail.com"
              className="w-full sm:w-auto flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-black border border-black hover:bg-black hover:text-white transition-all duration-300 min-w-0 sm:min-w-[170px] justify-center font-medium group text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Email Us</span>
            </a>
          </div>

          {/* Connect via Social Handles */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {socialHandles.map((handle) => {
              const Icon = handle.icon;
              return (
                <a
                  key={handle.name}
                  href={handle.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-[#FF7A00] text-black/80 hover:text-white text-xs font-medium border border-black/10 transition-colors rounded-xs"
                >
                  <Icon className="w-3.5 h-3.5 text-[#FF7A00] group-hover:text-white" />
                  <span>{handle.name}: <strong>{handle.handle}</strong></span>
                </a>
              );
            })}
          </div>

          <p className="text-black/50 text-[11px] sm:text-sm pt-2">
            Direct Studio Response within 24 hours. Confidential &amp; tailored estimates.
          </p>
        </motion.div>
      </div>

      {/* Interactive Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </section>
  );
}
