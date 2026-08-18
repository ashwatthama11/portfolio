import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

export default function App() {
  return (
    <div className="relative min-h-screen bg-white text-black flex flex-col font-sans selection:bg-[#FF7A00] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
