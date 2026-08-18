import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Palette, Ruler, LayoutGrid } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const iconMap = {
  DraftingCompass: Building2,
  Palette: Palette,
  Ruler: Ruler,
  LayoutGrid: LayoutGrid,
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28 md:py-36 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-serif text-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Our Services
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Building2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white border border-black/10 p-8 hover:border-[#FF7A00] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6">
                    <IconComponent className="w-10 h-10 stroke-[1.25] text-black group-hover:text-[#FF7A00] transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-black font-semibold mb-3 group-hover:text-[#FF7A00] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-black/70 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
                {/* Expanding accent underline */}
                <div className="mt-8 w-0 h-[2px] bg-[#FF7A00] group-hover:w-12 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
