import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = project?.gallery && project.gallery.length > 0
    ? project.gallery
    : [project?.image, project?.image, project?.image, project?.image].filter(Boolean);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  if (!project) return null;

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-6 pt-16 md:pt-20 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-white overflow-y-auto my-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black text-white hover:bg-[#FF7A00] transition-colors duration-300 flex items-center justify-center shadow"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 md:p-10">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Gallery Slider */}
              <div className="lg:col-span-7 space-y-4">
                {/* Main Large Image Container */}
                <div className="relative bg-black/5 overflow-hidden group aspect-video md:aspect-[16/10] rounded-sm">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${project.title} - View ${currentImageIndex + 1}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Previous Button */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#FF7A00] text-black hover:text-white w-9 h-9 rounded-full flex items-center justify-center transition-all shadow"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#FF7A00] text-black hover:text-white w-9 h-9 rounded-full flex items-center justify-center transition-all shadow"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Counter Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-xs">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </div>

                {/* Thumbnails Row */}
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative aspect-video overflow-hidden rounded-xs border-2 transition-all duration-200 ${
                        currentImageIndex === idx
                          ? 'border-[#FF7A00] opacity-100 ring-2 ring-[#FF7A00]/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Project Specifications & Story */}
              <div className="lg:col-span-5 space-y-6 pt-2">
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl text-black font-semibold mb-3">
                    {project.title}
                  </h3>
                  <div className="h-1 w-16 bg-[#FF7A00] mb-6" />
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-y-5 gap-x-4 border-y border-black/10 py-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-black/50 font-medium mb-1">
                      Project Type
                    </div>
                    <div className="text-base font-semibold text-black">
                      {project.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-black/50 font-medium mb-1">
                      Year
                    </div>
                    <div className="text-base font-semibold text-black">
                      {project.year}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-black/50 font-medium mb-1">
                      Location
                    </div>
                    <div className="text-base font-semibold text-black">
                      {project.location || "Madhya Pradesh, India"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-black/50 font-medium mb-1">
                      Area
                    </div>
                    <div className="text-base font-semibold text-black">
                      {project.area || "2,500 sq.ft"}
                    </div>
                  </div>
                </div>

                {/* Narrative Copy */}
                <div className="space-y-4 text-black/75 leading-relaxed text-sm md:text-base">
                  <h4 className="font-serif text-lg font-semibold text-black">
                    About This Project
                  </h4>
                  <p>
                    {project.description ||
                      "This project exemplifies our commitment to precision, functionality, and timeless design. Every detail was carefully considered to create a space that seamlessly blends form and purpose."}
                  </p>
                  {project.secondaryDescription && (
                    <p>
                      {project.secondaryDescription}
                    </p>
                  )}
                </div>

                {/* Direct Project Inquiry Button */}
                <div className="pt-4">
                  <a
                    href={`https://wa.me/916265597717?text=Hi%20Aman,%20I%20am%20interested%20in%20discussing%20a%20project%20similar%20to%20${encodeURIComponent(project.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full py-3.5 px-6 bg-[#FF7A00] text-white font-medium text-sm hover:bg-[#FF7A00]/90 transition-colors"
                  >
                    Inquire About This Project
                  </a>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
