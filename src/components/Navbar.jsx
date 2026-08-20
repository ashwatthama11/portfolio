import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, MapPin, Building2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { citiesData } from '../data/citiesData';
import { servicesData } from '../data/servicesData';

export default function Navbar({ onNavigateHome, onSelectCity, onSelectService, onNavigateSitemap, currentView }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [citiesDropdownOpen, setCitiesDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', isDropdown: 'services' },
    { name: 'Cities', isDropdown: 'cities' },
    { name: 'Projects', href: '#projects' },
    { name: 'Why Us', href: '#why-choose-us' },
    { name: 'Guides', href: '#guides' },
    { name: 'Sitemap', href: '#/sitemap', isCustomAction: 'sitemap' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (currentView === 'home') {
        const sections = ['home', 'services', 'cities', 'why-choose-us', 'projects', 'guides', 'contact'];
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
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleLinkClick = (e, href, isCustomAction = null) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setCitiesDropdownOpen(false);

    if (isCustomAction === 'sitemap' || href === '#/sitemap') {
      if (onNavigateSitemap) onNavigateSitemap();
      return;
    }

    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCityClick = (slug) => {
    setMobileMenuOpen(false);
    setCitiesDropdownOpen(false);
    onSelectCity(slug);
  };

  const handleServiceClick = (slug) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    onSelectService(slug);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-black/10 py-3 sm:py-3.5'
          : 'bg-white py-4 sm:py-5 border-b border-black/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => onNavigateHome()}
          className="flex items-center gap-2 sm:gap-3 group text-left py-1 cursor-pointer focus:outline-none"
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
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
          {navLinks.map((link) => {
            if (link.isDropdown === 'services') {
              return (
                <div 
                  key="services-dropdown" 
                  className="relative group"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <button
                    onClick={(e) => handleLinkClick(e, '#services')}
                    className="flex items-center gap-1 text-sm tracking-wide font-medium text-black/75 hover:text-[#FF7A00] transition-colors py-1 cursor-pointer"
                  >
                    <span>Services</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Services Dropdown Menu */}
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-1 w-72 bg-white border border-black/10 shadow-2xl p-2 rounded-xs z-50"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#FF7A00] px-3 py-1.5 border-b border-black/5">
                          Architectural Disciplines
                        </div>
                        {servicesData.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => handleServiceClick(s.slug)}
                            className="w-full text-left px-3 py-2 text-xs font-medium text-black hover:bg-[#FF7A00]/10 hover:text-[#FF7A00] transition-colors rounded-xs flex items-center justify-between cursor-pointer"
                          >
                            <span>{s.title}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (link.isDropdown === 'cities') {
              return (
                <div 
                  key="cities-dropdown" 
                  className="relative group"
                  onMouseEnter={() => setCitiesDropdownOpen(true)}
                  onMouseLeave={() => setCitiesDropdownOpen(false)}
                >
                  <button
                    onClick={(e) => handleLinkClick(e, '#cities')}
                    className="flex items-center gap-1 text-sm tracking-wide font-medium text-black/75 hover:text-[#FF7A00] transition-colors py-1 cursor-pointer"
                  >
                    <span>Cities</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Cities Dropdown Menu */}
                  <AnimatePresence>
                    {citiesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-1 w-64 bg-white border border-black/10 shadow-2xl p-2 rounded-xs z-50"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#FF7A00] px-3 py-1.5 border-b border-black/5">
                          Maharashtra &amp; MP Cities
                        </div>
                        {citiesData.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleCityClick(c.slug)}
                            className="w-full text-left px-3 py-2 text-xs font-medium text-black hover:bg-[#FF7A00]/10 hover:text-[#FF7A00] transition-colors rounded-xs flex items-center justify-between cursor-pointer"
                          >
                            <span>Architect in {c.name}</span>
                            <span className="text-[10px] text-black/40">{c.state}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = currentView === 'home' && activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.isCustomAction)}
                className={`relative text-sm tracking-wide font-medium transition-colors duration-300 py-1 ${
                  isActive ? 'text-black font-semibold' : 'text-black/70 hover:text-[#FF7A00]'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF7A00]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop WhatsApp CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+916265597717"
            className="text-xs font-medium text-black/70 hover:text-black flex items-center gap-1.5 pr-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>+91 6265597717</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="inline-flex items-center justify-center px-5 py-2 bg-black text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7A00] transition-colors duration-300 rounded-xs"
          >
            Contact Studio
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
            className="md:hidden bg-white border-b border-black/10 px-4 sm:px-6 py-5 overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onNavigateHome(); }}
                className="text-left text-sm font-semibold py-2 px-3 hover:bg-black/5 hover:text-[#FF7A00] rounded-xs"
              >
                Home
              </button>

              {/* Mobile Services Section */}
              <div className="pt-2 pb-1 border-t border-black/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A00] px-3 mb-1">
                  Our Services
                </div>
                {servicesData.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleServiceClick(s.slug)}
                    className="w-full text-left text-xs py-1.5 px-4 text-black/80 hover:text-[#FF7A00] hover:bg-neutral-50 rounded-xs flex items-center justify-between"
                  >
                    <span>{s.title}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Cities Section */}
              <div className="pt-2 pb-1 border-t border-black/5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A00] px-3 mb-1">
                  Cities We Serve
                </div>
                {citiesData.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCityClick(c.slug)}
                    className="w-full text-left text-xs py-1.5 px-4 text-black/80 hover:text-[#FF7A00] hover:bg-neutral-50 rounded-xs flex items-center justify-between"
                  >
                    <span>Architect in {c.name}</span>
                    <span className="text-[10px] text-black/40">{c.state}</span>
                  </button>
                ))}
              </div>

              {/* Quick links */}
              <div className="pt-2 border-t border-black/5">
                {['#projects', '#why-choose-us', '#guides', '#contact'].map((href) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => handleLinkClick(e, href)}
                    className="block text-sm font-medium py-2 px-3 text-black/80 hover:text-[#FF7A00]"
                  >
                    {href.replace('#', '').replace('-', ' ').toUpperCase()}
                  </a>
                ))}
                <button
                  onClick={(e) => handleLinkClick(e, '#/sitemap', 'sitemap')}
                  className="w-full text-left text-sm font-medium py-2 px-3 text-[#FF7A00] hover:bg-[#FF7A00]/10 flex items-center justify-between cursor-pointer"
                >
                  <span>SITEMAP DIRECTORY (HTML &amp; XML)</span>
                  <span className="text-xs">→</span>
                </button>
              </div>

              <div className="pt-3 border-t border-black/10 mt-2">
                <a
                  href="https://wa.me/916265597717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-[#FF7A00] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#FF7A00]/90 transition-colors shadow-md rounded-xs"
                >
                  Consult on WhatsApp (+91 6265597717)
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
