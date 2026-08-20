import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, MessageSquare, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: '/assets/hero-slide-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    title: 'Modern Residential Architecture',
    subtitle: 'Bespoke Villas in Pune, Mumbai & Indore'
  },
  {
    id: 2,
    image: '/assets/hero-blueprint.png',
    fallback: 'https://images.unsplash.com/photo-1681216868987-b7268753b81c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    title: 'Building Plan Approval & Sanction',
    subtitle: 'AutoDCR, BPMS & Nagar Nigam Clearances'
  },
  {
    id: 3,
    image: '/assets/hero-slide-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
    title: 'Luxury Interior Architecture',
    subtitle: 'Bespoke Living & Corporate Fit-outs'
  },
  {
    id: 4,
    image: '/assets/hero-slide-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    title: 'Commercial Mega-Structures',
    subtitle: 'Malls, Hospitals, Hotels & Complexes'
  },
  {
    id: 5,
    image: '/assets/hero-slide-4.jpg',
    fallback: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1920&q=80',
    title: 'DGPS & Total Station Survey',
    subtitle: 'Millimeter-Accurate Geodetic Mapping'
  }
];

export default function HeroSection({ onOpenQuote, onSelectCity, onSelectService }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] sm:min-h-[94vh] flex items-center justify-center overflow-hidden bg-black py-16 sm:py-24 md:py-32">
      
      {/* Dynamic Background Slideshow with Smooth Crossfade & Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: "easeInOut" },
              scale: { duration: 10, ease: "linear" }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover object-center grayscale contrast-115 brightness-60"
              onError={(e) => {
                e.currentTarget.src = heroSlides[currentSlide].fallback;
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-Layer Cinematic Gradients for Sharp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />
      </div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center flex flex-col items-center w-full">
        
        {/* Brand Emblem & State Coverage Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 sm:mb-6 flex flex-col items-center max-w-full"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#FF7A00]/20 rounded-full blur-xl opacity-40 group-hover:opacity-75 transition duration-700" />
            <img
              src="/assets/logo-white.png"
              alt="AR. Aman Verma Architect"
              className="relative h-10 sm:h-12 md:h-16 w-auto max-w-[260px] sm:max-w-none object-contain drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = "/images/witetext.png";
              }}
            />
          </div>

          {/* Regional Target Cities Pill */}
          <div className="mt-3 sm:mt-4 inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs tracking-wider text-white/95 uppercase font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Pune</span>
            <span className="text-[#FF7A00]">•</span>
            <span>Mumbai</span>
            <span className="text-[#FF7A00]">•</span>
            <span>Indore</span>
            <span className="text-[#FF7A00]">•</span>
            <span>Akola</span>
            <span className="text-[#FF7A00]">•</span>
            <span>Burhanpur</span>
          </div>
        </motion.div>

        {/* Primary H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] sm:leading-[1.1] mb-4 sm:mb-6 max-w-4xl"
        >
          Professional Architect &amp; Survey Services in Maharashtra &amp; Madhya Pradesh
        </motion.h1>

        {/* Natural Keyword Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-white/85 text-xs sm:text-base md:text-lg max-w-3xl mx-auto mb-8 sm:mb-10 font-light tracking-wide leading-relaxed drop-shadow-sm px-2"
        >
          Specializing in 100% Vastu house planning, municipal building plan approvals (AutoDCR/BPMS), commercial complexes, luxury interior architecture, and millimeter-accurate DGPS land surveying.
        </motion.p>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none"
        >
          <a
            href="https://wa.me/916265597717?text=Hi%20AR.%20Aman%20Verma,%20I%20would%20like%20to%20consult%20regarding%20architectural%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF7A00] text-white font-medium text-sm sm:text-base hover:bg-[#FF7A00]/90 transition-all duration-300 border border-[#FF7A00] min-w-0 sm:min-w-[220px] text-center shadow-lg hover:shadow-[#FF7A00]/30 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consult on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenQuote && onOpenQuote()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-medium text-sm sm:text-base hover:bg-neutral-100 transition-all duration-300 min-w-0 sm:min-w-[200px] text-center cursor-pointer shadow-md"
          >
            Get a Project Quote
          </button>

          <button
            type="button"
            onClick={() => handleScrollToSection('cities')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white font-medium text-sm sm:text-base border border-white/70 hover:bg-white hover:text-black transition-all duration-300 min-w-0 sm:min-w-[180px] text-center cursor-pointer"
          >
            Explore Cities &darr;
          </button>
        </motion.div>

        {/* Discipline Badges Strip */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-2 max-w-3xl">
          {[
            { name: 'House Planning & Vastu', slug: 'house-planning' },
            { name: 'Commercial Architecture', slug: 'commercial-architect' },
            { name: 'Municipal Approvals (AutoDCR)', slug: 'building-plan-approval' },
            { name: 'DGPS Land Survey', slug: 'land-survey' },
            { name: 'Luxury Interiors', slug: 'interior-design' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectService && onSelectService(item.slug)}
              className="px-3 py-1 bg-white/10 hover:bg-[#FF7A00] text-white/80 hover:text-white text-[11px] font-medium transition-colors border border-white/15 rounded-xs cursor-pointer flex items-center gap-1"
            >
              <span>{item.name}</span>
              <ChevronRight className="w-3 h-3 text-[#FF7A00]" />
            </button>
          ))}
        </div>

      </div>

      {/* 10-Second Slideshow Progress Indicators & Navigation */}
      <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-1.5 pointer-events-auto px-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 max-w-full overflow-x-auto">
          {heroSlides.map((slide, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className="group relative h-3 flex items-center justify-center transition-all duration-300 px-0.5"
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isActive
                      ? 'w-8 sm:w-14 bg-white/30 overflow-hidden relative'
                      : 'w-2 sm:w-3 bg-white/30 group-hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      key={`progress-${currentSlide}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 10, ease: 'linear' }}
                      className="h-full bg-[#FF7A00] rounded-full"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="text-[9px] sm:text-[10px] tracking-[0.2em] text-white/70 uppercase font-medium text-center">
          0{currentSlide + 1} &mdash; {heroSlides[currentSlide].title}
        </div>
      </div>

    </section>
  );
}
