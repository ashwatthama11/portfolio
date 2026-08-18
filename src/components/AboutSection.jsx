import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="relative group overflow-hidden bg-neutral-100 shadow-xl max-w-lg mx-auto lg:max-w-none">
              <img
                src="/assets/aman-verma-portrait.png"
                alt="AR. Aman Verma - Principal Architect & Founder at Aman Verma Architect Studio"
                loading="lazy"
                className="w-full h-auto object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80";
                }}
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative and Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6 sm:space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black">
              Studio Philosophy
            </div>

            <h2 className="font-serif text-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              About Aman Verma Architect
            </h2>

            <div className="space-y-4 sm:space-y-6 text-black/75 leading-relaxed text-sm sm:text-base md:text-lg">
              <p>
                We believe architecture is more than building structures—it's about crafting experiences that resonate with simplicity, precision, and sustainability.
              </p>
              <p>
                Every project begins with understanding your vision and translating it into spaces that are functional, timeless, and beautifully balanced.
              </p>
              <p>
                With expertise spanning architecture, interiors, planning, civil engineering, and surveying, we approach each design challenge with meticulous attention to detail and unwavering commitment to excellence.
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-4">
              <div>
                <div className="font-serif text-black text-xl sm:text-2xl md:text-3xl italic tracking-wide">
                  AR. Aman Verma
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-black/50 mt-1 font-medium">
                  Principal Architect &amp; Founder
                </div>
              </div>
              <img
                src="/assets/logo-vertical.png"
                alt="Architect Seal"
                className="h-10 sm:h-12 w-auto object-contain opacity-80"
                onError={(e) => {
                  e.currentTarget.src = "/images/big logo.png";
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
