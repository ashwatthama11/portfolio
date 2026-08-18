import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="relative py-16 sm:py-24 md:py-36 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        
        {/* Large Decorative Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8 flex justify-center"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#FF7A00]/10 flex items-center justify-center">
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF7A00] fill-[#FF7A00]" />
          </div>
        </motion.div>

        {/* Animated Testimonial Text */}
        <div className="min-h-[150px] sm:min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 sm:space-y-6"
            >
              <p className="font-serif italic text-black/85 text-base sm:text-2xl md:text-3xl leading-relaxed max-w-3xl mx-auto px-2">
                "{current.quote}"
              </p>
              <div>
                <h4 className="font-semibold text-black text-base sm:text-lg md:text-xl">
                  {current.name}
                </h4>
                <p className="text-black/60 text-xs sm:text-sm mt-0.5 sm:mt-1">
                  {current.project}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows & Indicator Dots */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 sm:w-12 sm:h-12 border border-black/20 hover:border-[#FF7A00] hover:bg-[#FF7A00] hover:text-white transition-all duration-300 flex items-center justify-center text-black"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-6 sm:w-8 bg-[#FF7A00]'
                    : 'w-2 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 sm:w-12 sm:h-12 border border-black/20 hover:border-[#FF7A00] hover:bg-[#FF7A00] hover:text-white transition-all duration-300 flex items-center justify-center text-black"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
