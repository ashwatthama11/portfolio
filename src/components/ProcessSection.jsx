import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Lightbulb, Layers, Hammer } from 'lucide-react';
import BlueprintGrid from './BlueprintGrid';
import { processData } from '../data/processData';

const iconMap = {
  MessageCircle: MessageCircle,
  Lightbulb: Lightbulb,
  Layers: Layers,
  Hammer: Hammer,
};

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-16 sm:py-24 md:py-36 bg-white overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <BlueprintGrid className="absolute inset-0 z-0 opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20 md:mb-28"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black mb-3">
            Methodology
          </div>
          <h2 className="font-serif text-black text-2xl sm:text-4xl md:text-5xl tracking-tight">
            Our Process
          </h2>
        </motion.div>

        {/* Timeline Row with connecting line */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-[#FF7A00]/40 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
            {processData.map((step, index) => {
              const IconComponent = iconMap[step.icon] || MessageCircle;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center relative z-10 p-4 sm:p-0 bg-white/60 sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0 border-black/5"
                >
                  {/* Step Badge */}
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#FF7A00] flex items-center justify-center bg-white shadow-md transition-transform duration-300">
                      <span className="text-xl sm:text-2xl font-serif text-[#FF7A00] font-semibold">
                        {step.step}
                      </span>
                    </div>
                    {/* Icon Badge Overlay */}
                    <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center shadow">
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-black font-semibold mb-1.5 sm:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-black/70 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-none">
                    {step.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
