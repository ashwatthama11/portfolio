import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'services', 'projects', 'process', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5 py-3 sm:py-4'
          : 'bg-white py-4 sm:py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-2 sm:gap-3 group text-left py-1"
          aria-label="AR. Aman Verma Architect Home"
        >
          <img
            src="/assets/logo-horizontal.png"
            alt="AR. Aman Verma Architect"
            className="h-7 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            onError={(e) => {
              e.currentTarget.src = "/images/horizontal.png";
            }}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative text-sm tracking-wide font-medium transition-colors duration-300 py-1 ${
                  isActive ? 'text-black font-semibold' : 'text-black/70 hover:text-[#FF7A00]'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Contact CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-black text-white text-sm font-medium tracking-wide hover:bg-[#FF7A00] transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-black hover:text-[#FF7A00] transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/10 px-4 sm:px-6 py-5 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-base font-medium py-2.5 px-3 rounded-xs transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#FF7A00]/10 text-[#FF7A00] font-semibold'
                        : 'text-black/80 hover:bg-black/5 hover:text-[#FF7A00]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />}
                  </a>
                );
              })}
              <div className="pt-3 border-t border-black/10 mt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="block w-full text-center px-6 py-3.5 bg-black text-white text-sm font-medium hover:bg-[#FF7A00] transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
