import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import CitiesSection from './components/CitiesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import ExpandableCityHub from './components/ExpandableCityHub';
import ProjectsSection from './components/ProjectsSection';
import ProcessSection from './components/ProcessSection';
import LongTailSeoSection from './components/LongTailSeoSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import MapSection from './components/MapSection';
import FooterSection from './components/FooterSection';
import CityPageView from './components/CityPageView';
import ServicePageView from './components/ServicePageView';
import SitemapView from './components/SitemapView';
import QuoteModal from './components/QuoteModal';

import { citiesData } from './data/citiesData';
import { servicesData } from './data/servicesData';

export default function App() {
  // Navigation View State: 'home', 'city', 'service', 'sitemap'
  const [currentView, setCurrentView] = useState('home');
  const [selectedCitySlug, setSelectedCitySlug] = useState(null);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(null);

  // Quote Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState(null);

  // Handle URL hash changes for deep linking (e.g., #/city/pune, #/service/house-planning, #/sitemap)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#/sitemap' || hash === '#sitemap') {
        setCurrentView('sitemap');
        setSelectedCitySlug(null);
        setSelectedServiceSlug(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else if (hash.startsWith('#/city/')) {
        const slug = hash.replace('#/city/', '').trim().toLowerCase();
        const cityExists = citiesData.find((c) => c.slug === slug);
        if (cityExists) {
          setSelectedCitySlug(slug);
          setCurrentView('city');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (hash.startsWith('#/service/')) {
        const slug = hash.replace('#/service/', '').trim().toLowerCase();
        const serviceExists = servicesData.find((s) => s.slug === slug);
        if (serviceExists) {
          setSelectedServiceSlug(slug);
          setCurrentView('service');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // Default or section anchor
      if (!hash.startsWith('#/city/') && !hash.startsWith('#/service/') && hash !== '#/sitemap' && hash !== '#sitemap') {
        setCurrentView('home');
      }
    };

    // Run on initial mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handler to navigate home
  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedCitySlug(null);
    setSelectedServiceSlug(null);
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler to open dedicated city view
  const handleSelectCity = (slug) => {
    setSelectedCitySlug(slug);
    setCurrentView('city');
    window.location.hash = `#/city/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler to open dedicated service view
  const handleSelectService = (slug) => {
    setSelectedServiceSlug(slug);
    setCurrentView('service');
    window.location.hash = `#/service/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler to open sitemap view
  const handleNavigateSitemap = () => {
    setCurrentView('sitemap');
    setSelectedCitySlug(null);
    setSelectedServiceSlug(null);
    window.location.hash = '#/sitemap';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler to trigger quote modal with prefill options
  const handleOpenQuote = (prefillData = null) => {
    setQuotePrefill(prefillData);
    setIsQuoteModalOpen(true);
  };

  // Find active city and service objects
  const activeCity = citiesData.find((c) => c.slug === selectedCitySlug);
  const activeService = servicesData.find((s) => s.slug === selectedServiceSlug);

  return (
    <div className="relative min-h-screen bg-white text-black flex flex-col font-sans selection:bg-[#FF7A00] selection:text-white">
      
      {/* Sticky Header Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onSelectCity={handleSelectCity}
        onSelectService={handleSelectService}
        onNavigateSitemap={handleNavigateSitemap}
      />

      {/* Main Content Render Based on View State */}
      <main className="flex-grow">
        {currentView === 'sitemap' ? (
          /* Visual HTML & XML Sitemap Directory */
          <SitemapView
            onNavigateHome={handleNavigateHome}
            onSelectCity={handleSelectCity}
            onSelectService={handleSelectService}
          />
        ) : currentView === 'city' && activeCity ? (
          /* Dedicated City Landing Page */
          <CityPageView
            city={activeCity}
            allCities={citiesData}
            allServices={servicesData}
            onNavigateHome={handleNavigateHome}
            onNavigateCity={handleSelectCity}
            onNavigateService={handleSelectService}
            onOpenQuote={handleOpenQuote}
          />
        ) : currentView === 'service' && activeService ? (
          /* Dedicated Service Landing Page */
          <ServicePageView
            service={activeService}
            allServices={servicesData}
            allCities={citiesData}
            onNavigateHome={handleNavigateHome}
            onNavigateCity={handleSelectCity}
            onNavigateService={handleSelectService}
            onOpenQuote={handleOpenQuote}
          />
        ) : (
          /* Complete Rich Homepage View */
          <>
            {/* 1. Hero Section with H1: "Professional Architect & Survey Services in Maharashtra & Madhya Pradesh" */}
            <HeroSection
              onOpenQuote={handleOpenQuote}
              onSelectCity={handleSelectCity}
              onSelectService={handleSelectService}
            />

            {/* 2. About Section */}
            <AboutSection />

            {/* 3. Services Overview Section (5 Core High-SEO Services) */}
            <ServicesSection onSelectService={handleSelectService} />

            {/* 4. Cities We Serve Section (Pune, Mumbai, Indore, Akola, Burhanpur) */}
            <CitiesSection onSelectCity={handleSelectCity} />

            {/* 5. Why Choose Us Section (Vastu, AutoDCR, DGPS, Turnkey) */}
            <WhyChooseUsSection onOpenQuote={handleOpenQuote} />

            {/* 6. Expandable Safe SEO Content (City Hub Accordions) */}
            <ExpandableCityHub
              onSelectCity={handleSelectCity}
              onSelectService={handleSelectService}
            />

            {/* 7. Featured Projects Section */}
            <ProjectsSection />

            {/* 8. Long-Tail SEO Knowledge Hub & Guides (200-300+ Words Expandable Articles) */}
            <LongTailSeoSection onOpenQuote={handleOpenQuote} />

            {/* 9. Methodology Process Section */}
            <ProcessSection />

            {/* 10. Client Testimonials Section */}
            <TestimonialsSection />

            {/* 11. Call to Action / Contact Section */}
            <ContactSection />

            {/* 12. Studio Location & Google Maps Card Section */}
            <MapSection />
          </>
        )}
      </main>

      {/* Footer with Cross-Links & NAP Citations */}
      <FooterSection
        onNavigateHome={handleNavigateHome}
        onSelectCity={handleSelectCity}
        onSelectService={handleSelectService}
        onNavigateSitemap={handleNavigateSitemap}
      />

      {/* Interactive Project Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialData={quotePrefill}
      />

    </div>
  );
}
