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
    
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
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
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl max-h-[94vh] sm:max-h-[90vh] bg-white overflow-y-auto my-auto shadow-2xl rounded-xs"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-2 sm:absolute sm:top-4 right-2 sm:right-4 ml-auto z-30 w-9 h-9 sm:w-10 sm:h-10 bg-black text-white hover:bg-[#FF7A00] transition-colors duration-300 flex items-center justify-center shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-4 sm:p-6 md:p-10 -mt-9 sm:mt-0">
            <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
              
              {/* Left Column: Gallery Slider */}
              <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                {/* Main Large Image Container */}
                <div className="relative bg-black/5 overflow-hidden group aspect-video sm:aspect-[16/10] rounded-xs">
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
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#FF7A00] text-black hover:text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#FF7A00] text-black hover:text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Counter Badge */}
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/75 text-white px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium backdrop-blur-xs">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </div>

                {/* Thumbnails Row */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
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
              <div className="lg:col-span-5 space-y-4 sm:space-y-6 pt-1 sm:pt-2">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-black font-semibold mb-2 sm:mb-3">
                    {project.title}
                  </h3>
                  <div className="h-1 w-12 sm:w-16 bg-[#FF7A00] mb-4 sm:mb-6" />
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-y-3 sm:gap-y-5 gap-x-3 sm:gap-x-4 border-y border-black/10 py-4 sm:py-6">
                  <div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-black/50 font-medium mb-0.5 sm:mb-1">
                      Project Type
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-black">
                      {project.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-black/50 font-medium mb-0.5 sm:mb-1">
                      Year
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-black">
                      {project.year}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-black/50 font-medium mb-0.5 sm:mb-1">
                      Location
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-black">
                      {project.location || "Madhya Pradesh, India"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-black/50 font-medium mb-0.5 sm:mb-1">
                      Area
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-black">
                      {project.area || "2,500 sq.ft"}
                    </div>
                  </div>
                </div>

                {/* Narrative Copy */}
                <div className="space-y-3 sm:space-y-4 text-black/75 leading-relaxed text-xs sm:text-sm md:text-base">
                  <h4 className="font-serif text-base sm:text-lg font-semibold text-black">
                    About This Project
                  </h4>
                  <p>
                    {project.description ||
                      "This project exemplifies our commitment to precision, functionality, and timeless design. Every detail was carefully considered to create a space that seamlessly blends form and purpose."}
                  </p>
                  {project.secondaryDescription && (
                    <p className="text-black/65">
                      {project.secondaryDescription}
                    </p>
                  )}
                </div>

                {/* Direct Project Inquiry Button */}
                <div className="pt-2 sm:pt-4">
                  <a
                    href={`https://wa.me/916265597717?text=Hi%20AR.%20Aman%20Verma,%20I%20am%20interested%20in%20discussing%20a%20project%20similar%20to%20${encodeURIComponent(project.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full py-3 sm:py-3.5 px-6 bg-[#FF7A00] text-white font-medium text-xs sm:text-sm hover:bg-[#FF7A00]/90 transition-colors shadow-sm"
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
