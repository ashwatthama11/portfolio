import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, CheckCircle2, ChevronRight, MessageSquare, 
  FileText, ShieldCheck, HelpCircle, ArrowLeft, Building2, 
  Ruler, Palette, LayoutGrid, ChevronDown, Award, Compass
} from 'lucide-react';
import BlueprintGrid from './BlueprintGrid';

export default function CityPageView({ city, onNavigateHome, onOpenQuote, onNavigateCity, onNavigateService, allCities, allServices }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  if (!city) return null;

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const whatsappMessage = `Hi AR. Aman Verma, I am looking for architectural / surveying services in ${city.name} (${city.state}). Please share more details.`;
  const whatsappUrl = `https://wa.me/916265597717?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="relative w-full bg-white text-black min-h-screen">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-neutral-900 text-white/80 py-3 border-b border-neutral-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button 
              onClick={onNavigateHome}
              className="text-white/60 hover:text-[#FF7A00] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-white/60">Cities We Serve</span>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-[#FF7A00] font-medium">{city.name}, {city.state}</span>
          </div>

          <button
            onClick={onNavigateHome}
            className="hidden sm:inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </button>
        </div>
      </div>

      {/* City Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28 bg-black text-white overflow-hidden">
        {/* Dynamic Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={city.heroImage}
            alt={`Architect in ${city.name} - Aman Verma Architects`}
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/80" />
        </div>

        {/* Blueprint Grid Accent */}
        <BlueprintGrid isDark className="absolute inset-0 z-0 opacity-20" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center flex flex-col items-center">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 text-[#FF7A00] text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Target Region: {city.name}, {city.state}</span>
          </motion.div>

          {/* Primary City H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight max-w-4xl"
          >
            {city.h1}
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 text-sm sm:text-lg md:text-xl max-w-3xl leading-relaxed mb-8 font-light"
          >
            {city.heroDescription}
          </motion.p>

          {/* Quick CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90 transition-all font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-[#FF7A00]/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consult on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenQuote && onOpenQuote({ location: `${city.name}, ${city.state}` })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black hover:bg-white/90 transition-all font-medium text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Get Estimate for {city.name}</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-2xl border-t border-white/15 pt-6 text-center">
            <div>
              <div className="font-serif text-xl sm:text-3xl text-white font-bold">{city.stats.projectsDone}</div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-0.5">Projects Delivered</div>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-3xl text-[#FF7A00] font-bold">{city.stats.avgApprovalDays}</div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-0.5">Sanction Timeline</div>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-3xl text-white font-bold">{city.stats.clientRating}</div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-0.5">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Municipal Jurisdictions & Coverage Areas Strip */}
      <section className="py-6 sm:py-8 bg-neutral-50 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF7A00] mb-1">
                Municipal Sanction Authorities &amp; Bylaws
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {city.jurisdictions.map((j, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-black/10 text-xs font-medium text-black">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{j}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="md:text-right">
              <div className="text-[11px] font-bold uppercase tracking-widest text-black/60 mb-1">
                Key Localities Served in {city.name}
              </div>
              <p className="text-xs text-black/70 max-w-xl">
                {city.localities.join(' • ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Localized Services Breakdown */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black mb-3">
              Full Suite of Services
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Architectural &amp; Survey Services in {city.name}
            </h2>
            <p className="text-black/70 text-sm sm:text-base mt-3">
              Tailored architectural blueprints, AutoDCR municipal approvals, luxury interior design, and DGPS land surveying optimized for {city.name} landowners and builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {city.localServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-neutral-50 border border-black/10 p-6 sm:p-8 hover:border-[#FF7A00] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2 py-0.5 bg-black text-white text-[10px] uppercase font-mono tracking-wider mb-4">
                    {city.name} Specialty
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-black group-hover:text-[#FF7A00] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-black/70 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-black/5">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-black/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7A00] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-black/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenQuote && onOpenQuote({ location: `${city.name}, ${city.state}`, service: service.title })}
                    className="text-xs font-semibold text-black group-hover:text-[#FF7A00] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inquire for {city.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Local Clients */}
      <section className="py-16 sm:py-20 bg-neutral-900 text-white overflow-hidden relative">
        <BlueprintGrid isDark className="absolute inset-0 z-0 opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-3">
              Local Advantages
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Why Clients in {city.name} Trust Aman Verma Architects
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {city.benefits.map((benefit, index) => (
              <div key={index} className="bg-black/50 border border-white/10 p-6 sm:p-7 hover:border-[#FF7A00] transition-all">
                <div className="w-10 h-10 rounded-full bg-[#FF7A00]/20 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 text-[#FF7A00]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQ Section */}
      <section className="py-16 sm:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-black">
              Architect &amp; Land Survey FAQs for {city.name}
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {city.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-black/10 transition-all rounded-xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif font-semibold text-black text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-[#FF7A00] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-black/75 text-xs sm:text-sm leading-relaxed border-t border-black/5 bg-neutral-50/50">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Link Other Cities for Internal SEO Link Equity */}
      <section className="py-12 bg-white border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <div className="text-xs uppercase tracking-widest text-black/50 font-semibold mb-4">
            Explore Architectural &amp; Survey Services in Other Cities
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {allCities && allCities.map((otherCity) => (
              <button
                key={otherCity.id}
                onClick={() => onNavigateCity && onNavigateCity(otherCity.slug)}
                className={`px-4 py-2 text-xs font-medium transition-all cursor-pointer border ${
                  otherCity.id === city.id
                    ? 'bg-black text-white border-black'
                    : 'bg-neutral-50 text-black hover:border-[#FF7A00] hover:text-[#FF7A00] border-black/10'
                }`}
              >
                Architect in {otherCity.name} ({otherCity.state})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 sm:py-16 bg-[#FF7A00] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold mb-3">
            Ready to Start Your Project in {city.name}?
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Get personalized architectural blueprints, Vastu consultation, municipal sanction support, and DGPS surveying across {city.name}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-black text-white font-semibold text-sm hover:bg-neutral-900 transition-colors shadow-lg"
            >
              Direct WhatsApp Chat
            </a>
            <button
              onClick={() => onOpenQuote && onOpenQuote({ location: `${city.name}, ${city.state}` })}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold text-sm hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Request Free Estimate
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
