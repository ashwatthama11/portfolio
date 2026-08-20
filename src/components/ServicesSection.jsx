import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Palette, Ruler, Layers, ChevronRight, Sparkles } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const iconMap = {
  DraftingCompass: Building2,
  Building2: Building2,
  Palette: Palette,
  Ruler: Ruler,
  Layers: Layers,
};

export default function ServicesSection({ onSelectService }) {
  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-36 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black mb-3">
            Core Disciplines
          </div>
          <h2 className="font-serif text-black text-2xl sm:text-4xl md:text-5xl tracking-tight font-bold">
            Architectural, Surveying &amp; Design Services
          </h2>
          <p className="text-black/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3">
            End-to-end architectural engineering, Vastu house planning, municipal sanctions (AutoDCR/BPMS), and millimeter-accurate DGPS land surveying across Maharashtra and Madhya Pradesh.
          </p>
        </motion.div>

        {/* 5 Core Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Building2;
            const isWide = index === 3 || index === 4;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => onSelectService && onSelectService(service.slug)}
                className={`group relative bg-white border border-black/10 p-6 sm:p-8 hover:border-[#FF7A00] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer rounded-xs ${
                  isWide ? 'lg:col-span-1.5' : ''
                }`}
              >
                <div>
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-black/5 group-hover:bg-[#FF7A00]/10 flex items-center justify-center transition-colors">
                      <IconComponent className="w-6 h-6 text-black group-hover:text-[#FF7A00] transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 px-2 py-0.5 bg-neutral-100 group-hover:bg-[#FF7A00]/10 group-hover:text-[#FF7A00] transition-colors rounded-xs">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl text-black font-bold mb-2 group-hover:text-[#FF7A00] transition-colors">
                    {service.title}
                  </h3>

                  {/* Tagline / Subtitle */}
                  <div className="text-xs font-semibold text-[#FF7A00] mb-3">
                    {service.keywords[0]}
                  </div>

                  {/* Description */}
                  <p className="text-black/70 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-black group-hover:text-[#FF7A00] transition-colors flex items-center gap-1">
                    <span>Explore Discipline &amp; Deliverables</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-[#FF7A00] group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4 text-black group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
