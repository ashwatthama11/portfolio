import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Building2, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { citiesData } from '../data/citiesData';

export default function ExpandableCityHub({ onSelectCity, onSelectService }) {
  // Store which city accordion is expanded (default to Pune open or null)
  const [expandedCityId, setExpandedCityId] = useState('pune');

  const toggleCity = (id) => {
    setExpandedCityId(expandedCityId === id ? null : id);
  };

  return (
    <section className="relative py-16 sm:py-24 bg-white border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Local Service Hubs</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
            City-by-City Architectural &amp; Surveying Services
          </h2>
          <p className="text-black/70 text-xs sm:text-base mt-2.5">
            Click any city below to explore localized house planning, building plan sanction procedures, interior design, and DGPS land surveys.
          </p>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {citiesData.map((city) => {
            const isExpanded = expandedCityId === city.id;

            return (
              <div
                key={city.id}
                className={`border transition-all duration-300 rounded-xs overflow-hidden ${
                  isExpanded
                    ? 'border-[#FF7A00] shadow-md bg-white'
                    : 'border-black/15 bg-neutral-50/70 hover:border-black/30'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleCity(city.id)}
                  aria-expanded={isExpanded}
                  className="w-full py-4 sm:py-5 px-5 sm:px-8 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer bg-white"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                      isExpanded ? 'bg-[#FF7A00] text-white' : 'bg-black/5 text-black'
                    }`}>
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-black flex items-center gap-2">
                        <span>Click to view services in {city.name}</span>
                        <span className="text-xs font-sans font-normal text-black/50 hidden sm:inline">
                          ({city.state})
                        </span>
                      </h3>
                      <p className="text-[11px] sm:text-xs text-black/60 font-medium">
                        AutoDCR Sanctions • Vastu House Planning • Luxury Interiors • DGPS Land Survey
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-[#FF7A00] hidden md:inline">
                      {isExpanded ? 'Collapse' : 'Explore'}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                      isExpanded ? 'bg-[#FF7A00]/10 border-[#FF7A00] rotate-180' : 'bg-neutral-100 border-black/10'
                    }`}>
                      <ChevronDown className={`w-4 h-4 ${isExpanded ? 'text-[#FF7A00]' : 'text-black/60'}`} />
                    </div>
                  </div>
                </button>

                {/* Expandable Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-black/10 bg-neutral-50/50"
                    >
                      <div className="p-5 sm:p-8 space-y-6">
                        
                        {/* Keyword-Rich Overview Summary */}
                        <div className="bg-white p-4 sm:p-5 border border-black/10 rounded-xs">
                          <h4 className="font-serif font-bold text-black text-sm sm:text-base mb-1">
                            Architect in {city.name} &mdash; Comprehensive Local Solutions
                          </h4>
                          <p className="text-black/75 text-xs sm:text-sm leading-relaxed">
                            AR. Aman Verma delivers high-end architectural design, building plan approvals for {city.jurisdictions[0]}, and high-precision surveying across {city.localities.slice(0, 8).join(', ')}.
                          </p>
                        </div>

                        {/* Localized 5 Core Services Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          
                          {/* 1. House Planning */}
                          <div className="p-3.5 sm:p-4 bg-white border border-black/10 hover:border-[#FF7A00] transition-colors rounded-xs">
                            <div className="flex items-center gap-2 text-black font-serif font-bold text-sm sm:text-base mb-1">
                              <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
                              <span>House Planning {city.name}</span>
                            </div>
                            <p className="text-black/70 text-xs leading-relaxed">
                              2D blueprints, 3D front elevations, and 100% Vastu shastra compliance designed for {city.name} residential plots and bungalows.
                            </p>
                          </div>

                          {/* 2. Building Plan Approval */}
                          <div className="p-3.5 sm:p-4 bg-white border border-black/10 hover:border-[#FF7A00] transition-colors rounded-xs">
                            <div className="flex items-center gap-2 text-black font-serif font-bold text-sm sm:text-base mb-1">
                              <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
                              <span>Building Plan Approval {city.name}</span>
                            </div>
                            <p className="text-black/70 text-xs leading-relaxed">
                              Fast-track AutoDCR / BPMS drawings, municipal sanction files, and regularisation clearance with {city.jurisdictions[0]}.
                            </p>
                          </div>

                          {/* 3. Commercial Architect */}
                          <div className="p-3.5 sm:p-4 bg-white border border-black/10 hover:border-[#FF7A00] transition-colors rounded-xs">
                            <div className="flex items-center gap-2 text-black font-serif font-bold text-sm sm:text-base mb-1">
                              <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
                              <span>Commercial Architect {city.name}</span>
                            </div>
                            <p className="text-black/70 text-xs leading-relaxed">
                              Commercial shopping complexes, corporate office towers, hospitals, and hotels planned for optimal footfall and ROI.
                            </p>
                          </div>

                          {/* 4. Interior Designer */}
                          <div className="p-3.5 sm:p-4 bg-white border border-black/10 hover:border-[#FF7A00] transition-colors rounded-xs">
                            <div className="flex items-center gap-2 text-black font-serif font-bold text-sm sm:text-base mb-1">
                              <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
                              <span>Interior Designer {city.name}</span>
                            </div>
                            <p className="text-black/70 text-xs leading-relaxed">
                              Luxury residential styling, modular kitchens, Italian marble curation, and turnkey office fit-outs in {city.name}.
                            </p>
                          </div>

                          {/* 5. Land Survey */}
                          <div className="p-3.5 sm:p-4 bg-white border border-black/10 hover:border-[#FF7A00] transition-colors rounded-xs sm:col-span-2">
                            <div className="flex items-center gap-2 text-black font-serif font-bold text-sm sm:text-base mb-1">
                              <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0" />
                              <span>Land Survey {city.name} (DGPS &amp; Total Station)</span>
                            </div>
                            <p className="text-black/70 text-xs leading-relaxed">
                              Sub-centimeter satellite DGPS geodetic coordinates, agricultural farmland boundary demarcation, and topographic contour mapping across {city.name}.
                            </p>
                          </div>

                        </div>

                        {/* Direct Link to Dedicated City Page */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => onSelectCity && onSelectCity(city.slug)}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#FF7A00] transition-colors rounded-xs cursor-pointer"
                          >
                            <span>Open Full {city.name} City Page &amp; FAQs</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <a
                            href={`https://wa.me/916265597717?text=Hi%20AR.%20Aman%20Verma,%20I%20need%20architectural%20services%20in%20${city.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-[#FF7A00] hover:underline flex items-center gap-1"
                          >
                            <span>Direct WhatsApp for {city.name}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
