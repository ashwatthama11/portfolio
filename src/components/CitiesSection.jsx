import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { citiesData } from '../data/citiesData';

export default function CitiesSection({ onSelectCity }) {
  return (
    <section id="cities" className="relative py-16 sm:py-24 md:py-36 bg-[#FAFAFA] border-t border-black/10 overflow-hidden">
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
            <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Target Jurisdictions</span>
          </div>
          <h2 className="font-serif text-black text-2xl sm:text-4xl md:text-5xl tracking-tight font-bold">
            Cities We Serve in Maharashtra &amp; Madhya Pradesh
          </h2>
          <p className="text-black/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3">
            Providing localized architectural house planning, municipal sanctions (AutoDCR/BPMS), commercial complex design, and high-precision DGPS land surveys.
          </p>
        </motion.div>

        {/* 5 City Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {citiesData.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onSelectCity && onSelectCity(city.slug)}
              className="group relative bg-white border border-black/10 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#FF7A00] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* City Hero Thumbnail */}
                <div className="relative w-full h-48 overflow-hidden bg-neutral-900">
                  <img
                    src={city.heroImage}
                    alt={`Architect in ${city.name} - Aman Verma Architects`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 bg-black/80 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-widest border border-white/20">
                      {city.state}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-white leading-none">
                        {city.name}
                      </h3>
                      <span className="text-[11px] text-[#FF7A00] font-medium block mt-1">
                        Architect in {city.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white font-semibold">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{city.stats.clientRating.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  <p className="text-black/75 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {city.heroDescription}
                  </p>

                  <div className="pt-2 border-t border-black/5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-black/50 mb-2">
                      Local Authorities &amp; Sanctions
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {city.jurisdictions.slice(0, 2).map((j, jIdx) => (
                        <span key={jIdx} className="inline-flex items-center gap-1 text-[11px] text-black/80 bg-neutral-100 px-2 py-0.5 rounded-xs">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[200px]">{j}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="px-5 py-3.5 bg-neutral-50 group-hover:bg-[#FF7A00] border-t border-black/10 transition-colors flex items-center justify-between">
                <span className="text-xs font-semibold text-black group-hover:text-white transition-colors">
                  Explore Services in {city.name}
                </span>
                <ArrowRight className="w-4 h-4 text-black group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
