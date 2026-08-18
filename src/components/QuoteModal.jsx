import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, CheckCircle2, Building, Ruler, Calendar, MapPin, IndianRupee } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'Architecture & Design',
    projectType: 'Residential (Villa/House)',
    approxArea: '',
    location: '',
    budget: '₹25L - ₹50L',
    timeline: 'Within 1-3 Months',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const messageText = `*New Quote Request — AR. Aman Verma Architect*
---------------------------------------
👤 *Client Name:* ${formData.fullName}
📞 *Phone:* ${formData.phone}
✉️ *Email:* ${formData.email || 'Not provided'}
🏛️ *Service:* ${formData.service}
🏠 *Project Type:* ${formData.projectType}
📐 *Approx Area:* ${formData.approxArea || 'To be discussed'}
📍 *Location:* ${formData.location || 'Not specified'}
💰 *Estimated Budget:* ${formData.budget}
⏳ *Timeline:* ${formData.timeline}
📝 *Project Scope / Notes:* ${formData.message || 'No additional notes'}
---------------------------------------`;

    const waUrl = `https://wa.me/916265597717?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
    setSubmissionMethod('WhatsApp');
    setIsSubmitted(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const subject = `Quote Request: ${formData.projectType} - ${formData.fullName}`;
    const body = `Quote Request Details for AR. Aman Verma Architect:

Client Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Service Required: ${formData.service}
Project Type: ${formData.projectType}
Approximate Area: ${formData.approxArea || 'N/A'}
Project Location: ${formData.location || 'N/A'}
Budget Range: ${formData.budget}
Target Timeline: ${formData.timeline}

Project Description & Notes:
${formData.message || 'N/A'}`;

    const mailtoUrl = `mailto:amanvermaarchitect@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setSubmissionMethod('Email');
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white shadow-2xl z-10 border border-black/10 max-h-[90vh] overflow-y-auto my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="sticky top-0 z-20 bg-black text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo-white.png"
                alt="AR. Aman Verma"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/images/witetext.png";
                }}
              />
              <div className="border-l border-white/20 pl-3">
                <h3 className="font-serif text-lg font-bold tracking-tight text-white">
                  Request a Project Quote
                </h3>
                <p className="text-[11px] text-white/60 tracking-wider uppercase">
                  Architecture • Interiors • Planning • Surveying
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/10 hover:bg-[#FF7A00] text-white rounded-none flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8">
            {!isSubmitted ? (
              <form className="space-y-6">
                <div className="text-center sm:text-left mb-2">
                  <p className="text-black/70 text-sm">
                    Tell us about your project vision. Fill in the details below to receive a customized architectural estimate and consultation.
                  </p>
                </div>

                {/* Section 1: Client Contact Information */}
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] pb-1 border-b border-black/10">
                    1. Contact Information
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-[#FF7A00]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp <span className="text-[#FF7A00]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition"
                    />
                  </div>
                </div>

                {/* Section 2: Project Specifications */}
                <div className="space-y-4 pt-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] pb-1 border-b border-black/10">
                    2. Project Scope &amp; Requirements
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                        Primary Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition"
                      >
                        <option value="Architecture & Design">Architecture &amp; Structural Design</option>
                        <option value="Interior Design & Styling">Interior Architecture &amp; Styling</option>
                        <option value="Urban & Master Planning">Urban &amp; Layout Master Planning</option>
                        <option value="Surveying & Civil Work">Land Surveying &amp; Civil Consultancy</option>
                        <option value="Turnkey Architecture & Construction">Full Turnkey / Build Solution</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                        Project Category
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition"
                      >
                        <option value="Residential (Villa/House)">Residential (Villa / Independent House)</option>
                        <option value="Luxury Estate / Farmhouse">Luxury Estate / Farmhouse</option>
                        <option value="Commercial (Office/Retail)">Commercial (Office / Retail / Showroom)</option>
                        <option value="Hospitality & Institutional">Hospitality, Resort &amp; Institutional</option>
                        <option value="Renovation & Modernization">Renovation &amp; Modernization</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                        Approximate Area (Sq.Ft / Acres)
                      </label>
                      <input
                        type="text"
                        name="approxArea"
                        value={formData.approxArea}
                        onChange={handleChange}
                        placeholder="e.g. 3,500 sq.ft or 20x50 plot"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                        Project Location / City
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Indore, Bhopal, Ujjain"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition"
                      >
                        <option value="Under ₹25 Lakhs">Under ₹25 Lakhs</option>
                        <option value="₹25L - ₹50L">₹25 Lakhs – ₹50 Lakhs</option>
                        <option value="₹50L - ₹1 Crore">₹50 Lakhs – ₹1 Crore</option>
                        <option value="₹1 Crore - ₹3 Crore">₹1 Crore – ₹3 Crore</option>
                        <option value="₹3 Crore+">₹3 Crore+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                        Expected Start Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition"
                      >
                        <option value="Immediately / This Month">Immediately / This Month</option>
                        <option value="Within 1-3 Months">Within 1–3 Months</option>
                        <option value="3-6 Months">3–6 Months</option>
                        <option value="Planning & Exploration">Planning &amp; Exploration Stage</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-black/80 uppercase tracking-wider mb-1.5">
                      Specific Requirements or Vision
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your design preferences, number of floors, special features (e.g. courtyards, cantilevered balconies, sustainable materials)..."
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-black/15 focus:border-[#FF7A00] focus:bg-white text-black text-sm outline-none transition resize-none"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full sm:flex-1 py-3.5 px-6 bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90 transition-all font-medium text-sm flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Get Quote on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    className="w-full sm:flex-1 py-3.5 px-6 bg-black text-white hover:bg-black/90 transition-all font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Quote via Email</span>
                  </button>
                </div>
                
                <p className="text-center text-[11px] text-black/50">
                  Direct Studio Contact: +91 6265597717 | amanvermaarchitect@gmail.com
                </p>
              </form>
            ) : (
              /* Success Confirmation Screen */
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-serif text-2xl md:text-3xl text-black font-bold">
                  Quote Request Initiated!
                </h4>
                <p className="text-black/70 text-sm max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your project quote request for <strong>{formData.projectType}</strong> has been routed via {submissionMethod}.
                </p>
                <div className="p-4 bg-neutral-50 border border-black/10 max-w-md mx-auto text-xs text-left space-y-1.5">
                  <div><strong>Service:</strong> {formData.service}</div>
                  <div><strong>Location:</strong> {formData.location || 'As specified'}</div>
                  <div><strong>Budget:</strong> {formData.budget}</div>
                  <div><strong>Timeline:</strong> {formData.timeline}</div>
                </div>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={resetForm}
                    className="px-8 py-3 bg-black text-white text-sm font-medium hover:bg-[#FF7A00] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
