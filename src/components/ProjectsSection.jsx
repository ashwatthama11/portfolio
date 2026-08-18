import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-serif text-black text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Selected Works
          </h2>
        </motion.div>

        {/* Responsive Masonry / Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer overflow-hidden bg-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Orange Hover Overlay */}
                <div className="absolute inset-0 bg-[#FF7A00] opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-2xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium tracking-wider uppercase mb-1">
                      {project.type}
                    </p>
                    <p className="text-xs opacity-80 font-light">
                      {project.year}
                    </p>
                    <div className="mt-4 inline-block text-xs uppercase tracking-widest border-b border-white/60 pb-0.5">
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
