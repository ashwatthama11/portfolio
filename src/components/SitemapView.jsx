import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, BookOpen, ArrowLeft, ExternalLink, FileCode, CheckCircle2, ChevronRight } from 'lucide-react';
import BlueprintGrid from './BlueprintGrid';
import { citiesData } from '../data/citiesData';
import { servicesData } from '../data/servicesData';
import { longTailArticlesData } from '../data/longTailArticlesData';

export default function SitemapView({ onNavigateHome, onSelectCity, onSelectService }) {
  const sections = [
    { name: 'Home Page', href: '#home', desc: 'Main architectural studio landing page and overview' },
    { name: 'About Studio', href: '#about', desc: 'AR. Aman Verma biography, design philosophy & founder credentials' },
    { name: 'Core Disciplines', href: '#services', desc: 'Architecture, Interior Design, Land Surveying, Planning' },
    { name: 'Cities We Serve', href: '#cities', desc: 'Target coverage across Maharashtra & Madhya Pradesh' },
    { name: 'Why Choose Us', href: '#why-choose-us', desc: 'Vastu compliance, AutoDCR guarantee, DGPS accuracy' },
    { name: 'Selected Works (Portfolio)', href: '#projects', desc: '9 featured residential, commercial, interior & survey projects' },
    { name: 'Knowledge Hub & Guides', href: '#guides', desc: 'Detailed long-tail SEO guides and cost breakdowns' },
    { name: 'Our 4-Step Process', href: '#process', desc: 'Plot analysis, 2D zoning, 3D elevations, sanction drawings' },
    { name: 'Client Testimonials', href: '#testimonials', desc: '120+ verified 5-star client reviews' },
    { name: 'Contact & Quote Calculator', href: '#contact', desc: 'Direct studio consultation via WhatsApp, email & quote modal' },
    { name: 'Burhanpur Head Studio Map', href: '#location', desc: 'Interactive Google Maps directions for Kanch Mandir Marg studio' }
  ];

  return (
    <div className="relative w-full bg-white text-black min-h-screen">
      
      {/* Breadcrumb Bar */}
      <div className="bg-neutral-900 text-white/80 py-3 border-b border-neutral-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button 
              onClick={onNavigateHome}
              className="text-white/60 hover:text-[#FF7A00] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-[#FF7A00] font-medium">HTML &amp; XML Sitemap Directory</span>
          </div>

          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <section className="relative py-12 sm:py-16 bg-black text-white overflow-hidden">
        <BlueprintGrid isDark className="absolute inset-0 z-0 opacity-25" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/40 text-[#FF7A00] text-xs font-semibold tracking-widest uppercase mb-4">
            <FileCode className="w-3.5 h-3.5" />
            <span>Website Architecture &amp; Index</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Aman Verma Architects &mdash; Complete Sitemap
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            A complete directory of all pages, regional city hubs, architectural service disciplines, and SEO knowledge guides.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF7A00] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#FF7A00]/90 transition-colors shadow-md rounded-xs"
            >
              <FileCode className="w-4 h-4" />
              <span>View Raw XML Sitemap (/sitemap.xml)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors border border-white/20 rounded-xs"
            >
              <span>View robots.txt</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Directory Content */}
      <section className="py-12 sm:py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Column 1: City Landing Pages */}
            <div className="bg-white border border-black/10 p-6 sm:p-7 shadow-sm rounded-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-black/10 mb-4">
                <MapPin className="w-5 h-5 text-[#FF7A00]" />
                <h2 className="font-serif text-xl font-bold text-black">
                  Cities We Serve (5 Pages)
                </h2>
              </div>
              <ul className="space-y-3">
                {citiesData.map((city) => (
                  <li key={city.id} className="group">
                    <button
                      onClick={() => onSelectCity(city.slug)}
                      className="w-full text-left p-2.5 hover:bg-neutral-50 border border-transparent hover:border-black/10 rounded-xs transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm text-black group-hover:text-[#FF7A00] transition-colors">
                          Architect in {city.name}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-neutral-100 text-black/60 rounded">
                          {city.state}
                        </span>
                      </div>
                      <p className="text-[11px] text-black/60 mt-1 line-clamp-1">
                        {city.tagline}
                      </p>
                      <div className="text-[10px] text-[#FF7A00] font-mono mt-1">
                        #/city/{city.slug}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Core Service Pages */}
            <div className="bg-white border border-black/10 p-6 sm:p-7 shadow-sm rounded-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-black/10 mb-4">
                <Building2 className="w-5 h-5 text-[#FF7A00]" />
                <h2 className="font-serif text-xl font-bold text-black">
                  Core Disciplines (5 Pages)
                </h2>
              </div>
              <ul className="space-y-3">
                {servicesData.map((service) => (
                  <li key={service.id} className="group">
                    <button
                      onClick={() => onSelectService(service.slug)}
                      className="w-full text-left p-2.5 hover:bg-neutral-50 border border-transparent hover:border-black/10 rounded-xs transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs sm:text-sm text-black group-hover:text-[#FF7A00] transition-colors">
                          {service.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#FF7A00]/10 text-[#FF7A00] rounded">
                          Service
                        </span>
                      </div>
                      <p className="text-[11px] text-black/60 mt-1 line-clamp-1">
                        {service.tagline}
                      </p>
                      <div className="text-[10px] text-[#FF7A00] font-mono mt-1">
                        #/service/{service.slug}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Long-Tail SEO Knowledge Guides */}
            <div className="bg-white border border-black/10 p-6 sm:p-7 shadow-sm rounded-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-black/10 mb-4">
                <BookOpen className="w-5 h-5 text-[#FF7A00]" />
                <h2 className="font-serif text-xl font-bold text-black">
                  Knowledge Hub &amp; Guides (5)
                </h2>
              </div>
              <ul className="space-y-3">
                {longTailArticlesData.map((article) => (
                  <li key={article.id} className="p-2.5 border border-black/5 rounded-xs bg-neutral-50/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-black leading-snug">
                        {article.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-black/60 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="text-[10px] text-emerald-600 font-mono mt-1">
                      {article.badge} • {article.readTime}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Full Page Section Anchors Table */}
          <div className="mt-10 bg-white border border-black/10 p-6 sm:p-8 rounded-xs shadow-sm">
            <h3 className="font-serif text-xl font-bold text-black pb-3 border-b border-black/10 mb-4">
              Homepage Navigation &amp; Section Hierarchy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((sec, idx) => (
                <a
                  key={idx}
                  href={sec.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHome();
                    setTimeout(() => {
                      const el = document.querySelector(sec.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="p-3 bg-neutral-50 hover:bg-[#FF7A00]/10 border border-black/5 hover:border-[#FF7A00] transition-colors rounded-xs group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs sm:text-sm text-black group-hover:text-[#FF7A00]">
                      {sec.name}
                    </span>
                    <span className="text-[10px] font-mono text-black/40">
                      {sec.href}
                    </span>
                  </div>
                  <p className="text-[11px] text-black/60 mt-1">
                    {sec.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
