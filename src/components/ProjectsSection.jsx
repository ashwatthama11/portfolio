import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative py-16 sm:py-24 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 border border-black/10 text-[11px] font-semibold tracking-widest uppercase text-black mb-3">
            Portfolio Showcase
          </div>
          <h2 className="font-serif text-black text-2xl sm:text-4xl md:text-5xl tracking-tight">
            Selected Works
          </h2>
        </motion.div>

        {/* Responsive Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer overflow-hidden bg-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-xs"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.type} Architecture by AR. Aman Verma in ${project.location}`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Mobile Bottom Badge (Visible on small screens without hover) */}
                <div className="md:hidden absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF7A00] block mb-0.5">
                    {project.type} • {project.year}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight">
                    {project.title}
                  </h3>
                  <span className="text-[11px] text-white/70 block mt-1">
                    Tap to explore details &rarr;
                  </span>
                </div>

                {/* Desktop Hover Overlay */}
                <div className="hidden md:flex absolute inset-0 bg-[#FF7A00] opacity-0 group-hover:opacity-95 transition-opacity duration-300 items-center justify-center p-6 text-center">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-2xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium tracking-wider uppercase mb-1">
                      {project.type}
                    </p>
                    <p className="text-xs opacity-80 font-light">
                      {project.year} • {project.location}
                    </p>
                    <div className="mt-4 inline-block text-xs uppercase tracking-widest border-b border-white/60 pb-0.5 font-medium">
                      View Project
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
