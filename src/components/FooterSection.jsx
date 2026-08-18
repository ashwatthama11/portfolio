import React from 'react';
import { Instagram, Linkedin, Globe } from 'lucide-react';
import BlueprintGrid from './BlueprintGrid';

export default function FooterSection() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-black text-white py-20 overflow-hidden">
      {/* Dark Inverted Blueprint Grid Pattern */}
      <BlueprintGrid isDark className="absolute inset-0 z-0 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-16">
          
          {/* Column 1: Brand info */}
          <div className="space-y-4">
            <a
              href="#home"
              onClick={(e) => handleScroll(e, '#home')}
              className="inline-block group"
              aria-label="AR. Aman Verma Architect Home"
            >
              <img
                src="/assets/logo-white.png"
                alt="AR. Aman Verma Architect"
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/images/witetext.png";
                }}
              />
            </a>
            <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wider uppercase">
              Architecture • Planning • Interior • Surveyor • Civil
            </p>
            <p className="text-white/50 text-xs leading-relaxed max-w-sm">
              Crafting bespoke architectural spaces with precision, innovation, and timeless balance.
            </p>
            <div className="pt-2 text-xs text-white/70 space-y-1">
              <div><span className="text-white/40">Tel:</span> +91 6265597717</div>
              <div><span className="text-white/40">Email:</span> amanvermaarchitect@gmail.com</div>
              <div><span className="text-white/40">Web:</span> www.amanvermaarchitect.in</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 md:pl-8">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white/90">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Services', href: '#services' },
                { name: 'Projects', href: '#projects' },
                { name: 'Process', href: '#process' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-white/70 hover:text-[#FF7A00] transition-colors duration-300 text-sm inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-white/90">
              Follow Us
            </h4>
            <p className="text-white/60 text-xs">
              Stay connected with our latest architectural works and behind-the-scenes insights.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 border border-white/20 hover:border-[#FF7A00] hover:bg-[#FF7A00] transition-all duration-300 flex items-center justify-center group"
              >
                <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 border border-white/20 hover:border-[#FF7A00] hover:bg-[#FF7A00] transition-all duration-300 flex items-center justify-center group"
              >
                <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://bucket-rope-51632685.figma.site"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official Website"
                className="w-12 h-12 border border-white/20 hover:border-[#FF7A00] hover:bg-[#FF7A00] transition-all duration-300 flex items-center justify-center group"
              >
                <Globe className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Divider */}
        <div className="pt-8 border-t border-white/10 text-center text-white/60 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Aman Verma Architect. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
