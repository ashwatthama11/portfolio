import React from 'react';
import { Instagram, Linkedin, Facebook, Globe, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import BlueprintGrid from './BlueprintGrid';
import { citiesData } from '../data/citiesData';
import { servicesData } from '../data/servicesData';

export default function FooterSection({ onNavigateHome, onSelectCity, onSelectService, onNavigateSitemap }) {
  const handleScroll = (e, href) => {
    e.preventDefault();
    if (href === '#/sitemap' || href === '#sitemap') {
      if (onNavigateSitemap) onNavigateSitemap();
      return;
    }
    if (onNavigateHome) onNavigateHome();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/amanvermaarchitect/',
      icon: Instagram,
      label: '@amanvermaarchitect'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aman-verma-57ab69243/',
      icon: Linkedin,
      label: 'AR. Aman Verma'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/onenessaman/',
      icon: Facebook,
      label: 'Aman Verma Architects'
    },
    {
      name: 'Official Website',
      href: 'https://amanvermaarchitect.in',
      icon: Globe,
      label: 'amanvermaarchitect.in'
    }
  ];

  return (
    <footer className="relative bg-black text-white py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Dark Inverted Blueprint Grid Pattern */}
      <BlueprintGrid isDark className="absolute inset-0 z-0 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Studio Info */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigateHome && onNavigateHome()}
              className="inline-block group text-left cursor-pointer focus:outline-none"
              aria-label="AR. Aman Verma Architect Home"
            >
              <img
                src="/assets/logo-white.png"
                alt="AR. Aman Verma Architect"
                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/images/witetext.png";
                }}
              />
            </button>
            <p className="text-[#FF7A00] text-xs font-semibold tracking-wider uppercase">
              Architecture • Planning • Interior • Surveyor • Civil
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              Professional architect offering house planning, commercial architecture, building plan approvals, luxury interior design, and DGPS land surveys across Maharashtra &amp; Madhya Pradesh.
            </p>
            <div className="pt-2 text-xs text-white/80 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF7A00] shrink-0 mt-0.5" />
                <span>Kanch Mandir Marg, Sindhipura, Burhanpur, MP 450331</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                <a href="tel:+916265597717" className="hover:text-[#FF7A00] transition-colors">+91 6265597717</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                <a href="mailto:amanvermaarchitect@gmail.com" className="hover:text-[#FF7A00] transition-colors">amanvermaarchitect@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Column 2: Architectural Services Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/90 pb-1 border-b border-white/10">
              Our Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService && onSelectService(s.slug)}
                    className="text-white/70 hover:text-[#FF7A00] transition-colors text-left py-0.5 cursor-pointer flex items-center gap-1"
                  >
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Regional City Hubs */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/90 pb-1 border-b border-white/10">
              Cities We Serve
            </h4>
            <ul className="space-y-2 text-xs">
              {citiesData.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelectCity && onSelectCity(c.slug)}
                    className="text-white/70 hover:text-[#FF7A00] transition-colors text-left py-0.5 cursor-pointer flex items-center justify-between w-full"
                  >
                    <span>Architect in {c.name}</span>
                    <span className="text-[10px] text-white/40">{c.state}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Social */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/90 pb-1 border-b border-white/10">
              Navigation &amp; Sitemaps
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Studio', href: '#about' },
                { name: 'Selected Works', href: '#projects' },
                { name: 'Why Us', href: '#why-choose-us' },
                { name: 'SEO Guides', href: '#guides' },
                { name: 'Our Process', href: '#process' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Studio Map', href: '#location' },
                { name: 'HTML Sitemap', href: '#/sitemap', isCustom: true },
                { name: 'XML Sitemap', href: '/sitemap.xml', isExternal: true },
              ].map((link) => (
                <li key={link.name}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF7A00] hover:underline transition-colors inline-block py-0.5 font-semibold"
                    >
                      {link.name} &rarr;
                    </a>
                  ) : link.isCustom ? (
                    <button
                      onClick={() => onNavigateSitemap && onNavigateSitemap()}
                      className="text-[#FF7A00] hover:underline transition-colors inline-block py-0.5 font-semibold cursor-pointer text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="text-white/70 hover:text-[#FF7A00] transition-colors inline-block py-0.5"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <a
                href="https://wa.me/916265597717"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF7A00] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7A00]/90 transition-colors shadow-md rounded-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    title={`${item.name}: ${item.label}`}
                    className="w-9 h-9 border border-white/20 hover:border-[#FF7A00] hover:bg-[#FF7A00] transition-all duration-300 flex items-center justify-center group rounded-xs"
                  >
                    <IconComponent className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Copyright & SEO Citation */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-white/50 text-[11px] sm:text-xs gap-3 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} AR. Aman Verma Architects (amanvermaarchitect.in). All Rights Reserved.
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button
              onClick={() => onNavigateSitemap && onNavigateSitemap()}
              className="text-white/60 hover:text-[#FF7A00] transition-colors cursor-pointer"
            >
              HTML Sitemap Directory
            </button>
            <span>•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF7A00] hover:underline"
            >
              XML Sitemap
            </a>
            <span>•</span>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#FF7A00]"
            >
              robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
