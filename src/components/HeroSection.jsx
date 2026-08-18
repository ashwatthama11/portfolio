import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    id: 1,
    image: '/assets/hero-slide-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    title: 'Modern Architecture',
    subtitle: 'Bespoke Residential Design'
  },
  {
    id: 2,
    image: '/assets/hero-blueprint.png',
    fallback: 'https://images.unsplash.com/photo-1681216868987-b7268753b81c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80',
    title: 'Precision Planning',
    subtitle: 'Drafting & Architectural Engineering'
  },
  {
    id: 3,
    image: '/assets/hero-slide-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
    title: 'Interior Design',
    subtitle: 'Spaces of Balance & Light'
  },
  {
    id: 4,
    image: '/assets/hero-slide-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    title: 'Commercial Structures',
    subtitle: 'Civic & Urban Excellence'
  },
  {
    id: 5,
    image: '/assets/hero-slide-4.jpg',
    fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    title: 'Contemporary Living',
    subtitle: 'Sustainable Craftsmanship'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 10 seconds (10,000 ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] md:min-h-[95vh] flex items-center justify-center overflow-hidden bg-black">
      
      {/* Dynamic Background Slideshow with Smooth Crossfade & Subtle Ken Burns Zoom */}
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
              className="w-full h-full object-cover object-center grayscale contrast-110 brightness-75"
              onError={(e) => {
                e.currentTarget.src = heroSlides[currentSlide].fallback;
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Multi-Layer Gradient Overlays for High Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70 pointer-events-none" />
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 py-24 md:py-32 text-center flex flex-col items-center">
        {/* Brand Emblem / Logo Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="relative group">
            {/* Subtle glow backdrop */}
            <div className="absolute -inset-4 bg-[#FF7A00]/20 rounded-full blur-xl opacity-40 group-hover:opacity-75 transition duration-700" />
            <img
              src="/assets/logo-white.png"
              alt="AR. Aman Verma Architect"
              className="relative h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = "/images/witetext.png";
              }}
            />
          </div>

          {/* Discipline Tagline Pill */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs tracking-[0.22em] text-white/90 uppercase font-medium">
            <span>Architecture</span>
            <span className="text-[#FF7A00]">•</span>
            <span>Planning</span>
            <span className="text-[#FF7A00]">•</span>
            <span>Interior</span>
            <span className="text-[#FF7A00]">•</span>
            <span>Surveyor</span>
            <span className="text-[#FF7A00]">•</span>
            <span>Civil</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] mb-6"
        >
          Designing spaces with precision and purpose.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-white/85 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 font-light tracking-wide leading-relaxed drop-shadow-sm"
        >
          Crafting bespoke architectural, interior, and urban environments tailored for modern distinction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="https://wa.me/916265597717"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#FF7A00] text-white font-medium text-base hover:bg-[#FF7A00]/90 transition-all duration-300 border border-[#FF7A00] min-w-[220px] text-center shadow-lg hover:shadow-[#FF7A00]/30"
          >
            Contact Us on WhatsApp
          </a>
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-medium text-base border border-white/80 hover:bg-white hover:text-black transition-all duration-300 min-w-[200px] text-center backdrop-blur-xs"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      {/* 10-Second Slideshow Progress Indicators & Navigation */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          {heroSlides.map((slide, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className="group relative h-2.5 flex items-center justify-center transition-all duration-300"
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isActive
                      ? 'w-10 md:w-14 bg-white/30 overflow-hidden relative'
                      : 'w-2.5 md:w-3 bg-white/30 group-hover:bg-white/60'
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
        
        {/* Active Slide Name Label */}
        <div className="text-[10px] tracking-[0.25em] text-white/60 uppercase font-medium">
          0{currentSlide + 1} &mdash; {heroSlides[currentSlide].title}
        </div>
      </div>

    </section>
  );
}
