import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Palette, Ruler, Layers, ChevronRight, MessageSquare, 
  FileText, CheckCircle2, ArrowLeft, ChevronDown, HelpCircle, 
  Clock, Shield, Sparkles, MapPin 
} from 'lucide-react';
import BlueprintGrid from './BlueprintGrid';

const iconMap = {
  DraftingCompass: Building2,
  Building2: Building2,
  Palette: Palette,
  Layers: Layers,
  Ruler: Ruler,
};

export default function ServicePageView({ service, onNavigateHome, onOpenQuote, onNavigateCity, onNavigateService, allServices, allCities }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  if (!service) return null;

  const IconComponent = iconMap[service.icon] || Building2;

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const whatsappMessage = `Hi AR. Aman Verma, I am interested in your ${service.title} for my upcoming project. Please share consultation details.`;
  const whatsappUrl = `https://wa.me/916265597717?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="relative w-full bg-white text-black min-h-screen">
      
      {/* Breadcrumbs Navigation Bar */}
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
            <span className="text-white/60">Services</span>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-[#FF7A00] font-medium">{service.title}</span>
          </div>

          <button
            onClick={onNavigateHome}
            className="hidden sm:inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Service Hero Banner */}
      <section className="relative py-16 sm:py-20 md:py-28 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.heroImage}
            alt={`${service.title} - Aman Verma Architects`}
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/80" />
        </div>

        <BlueprintGrid isDark className="absolute inset-0 z-0 opacity-20" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 text-[#FF7A00] text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6"
          >
            <IconComponent className="w-4 h-4" />
            <span>{service.badge}</span>
          </motion.div>

          {/* Primary Service H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight max-w-4xl"
          >
            {service.h1}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 text-sm sm:text-lg md:text-xl max-w-3xl leading-relaxed mb-8 font-light"
          >
            {service.description}
          </motion.p>

          {/* CTAs */}
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
              <span>Inquire on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenQuote && onOpenQuote({ service: service.title })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black hover:bg-white/90 transition-all font-medium text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Request Detailed Quote</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Deep Overview Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black">
                Comprehensive Scope
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-black">
                Precision &amp; Purpose in Every Detail
              </h2>
              <p className="text-black/80 text-sm sm:text-base md:text-lg leading-relaxed">
                {service.fullDescription}
              </p>
              
              <div className="pt-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-black mb-4">
                  What You Receive (Key Deliverables):
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 bg-neutral-50 border border-black/5 rounded-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-black/85 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-neutral-900 text-white p-6 sm:p-8 border border-black/10 shadow-xl rounded-xs">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF7A00] mb-2">
                Standard of Excellence
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mb-4">
                Why Choose Our {service.shortTitle}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <span><strong>100% Vastu &amp; Bylaw Compliance:</strong> Designed strictly to Unified DCPR / MP Bhumi Vikas Niyam.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <span><strong>Licensed Architect Sign-Off:</strong> Official CAD drawings accepted by all municipal corporations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <span><strong>Fast Turnaround:</strong> Initial concept designs delivered within 3 to 5 working days.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <span><strong>Multi-City Coverage:</strong> Direct on-site consultations across Pune, Mumbai, Indore, Akola, and Burhanpur.</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onOpenQuote && onOpenQuote({ service: service.title })}
                  className="w-full py-3 bg-[#FF7A00] hover:bg-[#FF7A00]/90 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request Consultation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Step by Step Workflow */}
      <section className="py-16 sm:py-24 bg-[#FAFAFA] border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black mb-3">
              Execution Methodology
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-black">
              Our 4-Stage Design &amp; Delivery Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.workflow.map((item, idx) => (
              <div key={idx} className="bg-white border border-black/10 p-6 sm:p-7 relative group hover:border-[#FF7A00] transition-all">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#FF7A00]/40 group-hover:text-[#FF7A00] transition-colors mb-3">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg font-bold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-black/70 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City-Specific Availability Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[11px] font-semibold uppercase tracking-widest text-black mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Regional Coverage</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black mb-4">
            Avail {service.title} in Your City
          </h2>
          <p className="text-black/60 text-xs sm:text-sm max-w-xl mx-auto mb-8">
            We provide specialized local authority compliance and on-site visits across target hubs:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {allCities && allCities.map((c) => (
              <button
                key={c.id}
                onClick={() => onNavigateCity && onNavigateCity(c.slug)}
                className="p-4 bg-neutral-50 hover:bg-black hover:text-white border border-black/10 transition-all text-center group cursor-pointer"
              >
                <div className="font-semibold text-xs sm:text-sm text-black group-hover:text-white mb-1">
                  {c.name}
                </div>
                <div className="text-[10px] text-black/50 group-hover:text-white/70">
                  {c.state}
                </div>
                <div className="text-[10px] text-[#FF7A00] font-medium mt-2 flex items-center justify-center gap-0.5">
                  <span>View City Hub</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      <section className="py-16 sm:py-24 bg-neutral-50 border-t border-black/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions Answered</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-black">
              {service.title} &mdash; FAQs
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {service.faqs.map((faq, index) => {
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

      {/* Cross-Link Other Services for Strong Internal Linking */}
      <section className="py-12 bg-white border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <div className="text-xs uppercase tracking-widest text-black/50 font-semibold mb-4">
            Explore All Architectural &amp; Surveying Disciplines
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {allServices && allServices.map((otherS) => (
              <button
                key={otherS.id}
                onClick={() => onNavigateService && onNavigateService(otherS.slug)}
                className={`px-4 py-2 text-xs font-medium transition-all cursor-pointer border ${
                  otherS.id === service.id
                    ? 'bg-black text-white border-black'
                    : 'bg-neutral-50 text-black hover:border-[#FF7A00] hover:text-[#FF7A00] border-black/10'
                }`}
              >
                {otherS.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16 bg-black text-white text-center relative overflow-hidden">
        <BlueprintGrid isDark className="absolute inset-0 z-0 opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold mb-3 text-white">
            Transform Your Architectural Vision Today
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Connect with AR. Aman Verma for personalized project discussions, technical estimations, and on-site visits across Maharashtra and Madhya Pradesh.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF7A00] text-white font-semibold text-sm hover:bg-[#FF7A00]/90 transition-colors shadow-lg"
            >
              WhatsApp Consultation
            </a>
            <button
              onClick={() => onOpenQuote && onOpenQuote({ service: service.title })}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold text-sm hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Get a Free Quote
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
