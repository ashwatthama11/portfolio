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
    <section id="testimonials" className="relative py-28 md:py-36 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        
        {/* Large Decorative Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#FF7A00]/10 flex items-center justify-center">
            <Quote className="w-8 h-8 text-[#FF7A00] fill-[#FF7A00]" />
          </div>
        </motion.div>

        {/* Animated Testimonial Text */}
        <div className="min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="font-serif italic text-black/85 text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-3xl mx-auto">
                "{current.quote}"
              </p>
              <div>
                <h4 className="font-semibold text-black text-lg md:text-xl">
                  {current.name}
                </h4>
                <p className="text-black/60 text-sm mt-1">
                  {current.project}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows & Indicator Dots */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 border border-black/20 hover:border-[#FF7A00] hover:bg-[#FF7A00] hover:text-white transition-all duration-300 flex items-center justify-center text-black"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
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
                    ? 'w-8 bg-[#FF7A00]'
                    : 'w-2 bg-black/20 hover:bg-black/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 border border-black/20 hover:border-[#FF7A00] hover:bg-[#FF7A00] hover:text-white transition-all duration-300 flex items-center justify-center text-black"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
