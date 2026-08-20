import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Award, CheckCircle2, Clock, Ruler, Building2, Sparkles } from 'lucide-react';
import BlueprintGrid from './BlueprintGrid';

export default function WhyChooseUsSection({ onOpenQuote }) {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Municipal Sanction Guarantee',
      description: 'Zero rejection track record across Maharashtra BPMS/AutoDCR (PMC, PCMC, BMC, AMC) and Madhya Pradesh e-NagarPalika ABPAS (IMC, Burhanpur).'
    },
    {
      icon: Compass,
      title: 'Scientific Vastu Shastra Integration',
      description: 'Harmoniously aligning natural solar quadrants (Ishanya, Agni, Nairutya) with sleek contemporary minimalist architecture.'
    },
    {
      icon: Ruler,
      title: 'Millimeter-Accurate DGPS Surveying',
      description: 'Dual-frequency GNSS satellite receivers and laser Total Stations ensuring permanent boundary demarcation and error-free contour mapping.'
    },
    {
      icon: Award,
      title: 'End-to-End Turnkey Delivery',
      description: 'From initial 2D floor plans and 3D elevations to working structural blueprints, interior styling, and on-site engineering supervision.'
    }
  ];

  return (
    <section id="why-choose-us" className="relative py-16 sm:py-24 md:py-36 bg-neutral-900 text-white overflow-hidden">
      {/* Background blueprint grid */}
      <BlueprintGrid isDark className="absolute inset-0 z-0 opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Why Choose Aman Verma Architects</span>
          </div>
          <h2 className="font-serif text-white text-2xl sm:text-4xl md:text-5xl tracking-tight font-bold">
            Precision Engineering Meets Architectural Artistry
          </h2>
          <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3 font-light">
            We bridge the gap between creative design vision, legal municipal compliance, and field-tested construction accuracy.
          </p>
        </motion.div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="bg-black/60 border border-white/15 p-6 sm:p-8 hover:border-[#FF7A00] transition-all duration-300 flex flex-col justify-between group rounded-xs"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FF7A00]/20 flex items-center justify-center mb-6 text-[#FF7A00] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#FF7A00] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs text-[#FF7A00] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-black/40 border border-white/10 rounded-xs flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <div className="font-serif text-2xl sm:text-4xl font-bold text-white">120+</div>
            <div className="text-[11px] text-white/60 uppercase tracking-wider mt-1">Verified 5-Star Reviews</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div>
            <div className="font-serif text-2xl sm:text-4xl font-bold text-[#FF7A00]">100%</div>
            <div className="text-[11px] text-white/60 uppercase tracking-wider mt-1">Bylaw &amp; Vastu Compliance</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div>
            <div className="font-serif text-2xl sm:text-4xl font-bold text-white">5+ Cities</div>
            <div className="text-[11px] text-white/60 uppercase tracking-wider mt-1">Active Studios &amp; Sites</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div>
            <div className="font-serif text-2xl sm:text-4xl font-bold text-[#FF7A00]">DGPS &amp; TS</div>
            <div className="text-[11px] text-white/60 uppercase tracking-wider mt-1">Precision Survey Fleet</div>
          </div>
        </div>

      </div>
    </section>
  );
}
