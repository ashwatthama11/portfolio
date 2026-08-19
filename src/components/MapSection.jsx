import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Star, Copy, Check, Info } from 'lucide-react';

export default function MapSection() {
  const [copied, setCopied] = useState(false);

  const studioDetails = {
    name: "Aman Verma Architects: Architect in Burhanpur | Architecture Firm & Interior Designer",
    shortName: "Aman Verma Architects",
    address: "Kanch Mandir Marg, Sindhipura, Monin Pura, Burhanpur, Madhya Pradesh 450331, India",
    rating: "4.9",
    reviewCount: "120+",
    shareUrl: "https://maps.app.goo.gl/RKA1iZ4eaDaTuxFN6",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Aman+Verma+Architects,+Kanch+Mandir+Marg,+Sindhipura,+Monin+Pura,+Burhanpur,+Madhya+Pradesh+450331",
    embedUrl: "https://maps.google.com/maps?q=Aman%20Verma%20Architects%2C%20Kanch%20Mandir%20Marg%2C%20Sindhipura%2C%20Monin%20Pura%2C%20Burhanpur%2C%20Madhya%20Pradesh%20450331&t=&z=16&ie=UTF8&iwloc=&output=embed",
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(studioDetails.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" aria-label="Studio Location Map" className="relative w-full overflow-hidden bg-neutral-100 border-t border-black/10">
      {/* Full-width Map Container */}
      <div className="relative w-full h-[450px] sm:h-[500px] md:h-[560px] lg:h-[600px]">
        {/* Google Maps Full-Bleed Embed iframe */}
        <iframe
          title="Aman Verma Architects Studio Location Map in Burhanpur"
          src={studioDetails.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full block"
        />

        {/* Floating Google Maps Style Card Overlay */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 max-w-[calc(100%-32px)] sm:max-w-sm md:max-w-[420px] shadow-2xl pointer-events-auto"
        >
          <div className="bg-white/98 backdrop-blur-md rounded-xs sm:rounded-sm border border-black/10 p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300">
            
            {/* Header: Title + Action Icons */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-200">
              <div className="pr-1">
                <a
                  href={studioDetails.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  title="View on Google Maps"
                >
                  <h3 className="font-sans font-semibold text-neutral-900 text-sm sm:text-base leading-snug group-hover:text-[#FF7A00] transition-colors">
                    {studioDetails.name}
                  </h3>
                </a>
              </div>

              {/* Action Icons in Top Right */}
              <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                {/* External Link Icon */}
                <a
                  href={studioDetails.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in Google Maps"
                  aria-label="Open in Google Maps"
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors inline-flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                </a>

                {/* Turn / Directions Icon */}
                <a
                  href={studioDetails.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Get Directions"
                  aria-label="Get Directions"
                  className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all shadow-sm group"
                >
                  <Navigation className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="pt-3 space-y-2.5">
              <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <span>{studioDetails.address}</span>
              </p>

              {/* Rating & Review info */}
              <div className="flex items-center gap-2 pt-0.5">
                <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900">
                  <span>{studioDetails.rating}</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  </div>
                </div>
                <span className="text-neutral-300 text-xs">•</span>
                <a
                  href={studioDetails.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  ({studioDetails.reviewCount})
                </a>
                <span className="text-neutral-400 text-xs ml-auto inline-flex items-center" title="Verified Google Business Profile">
                  <Info className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3.5 mt-3 border-t border-neutral-200 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-medium transition-colors border border-neutral-200 cursor-pointer rounded-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>

              <a
                href={studioDetails.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-black hover:bg-[#FF7A00] text-white text-xs font-medium transition-colors rounded-xs shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
