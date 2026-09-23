import React, { useState } from "react";
import { ArrowLeft, Box, Layers, MousePointer2, Map, Search, ArrowRight } from "lucide-react";
import ColonyMapModal from "./ColonyMapModal";

const FEATURES = [
  { icon: <Layers size={16} />, label: "3D Plot Rendering" },
  { icon: <MousePointer2 size={16} />, label: "Click & Select Plots" },
  { icon: <Map size={16} />, label: "Satellite Basemap" },
  { icon: <Search size={16} />, label: "Plot Search" },
];

export default function SmartLayoutView({ onNavigateHome }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ColonyMapModal onClose={() => setIsOpen(false)} />}

      <section className="min-h-[calc(100vh-88px)] bg-[#111111] text-white">
        <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col justify-between px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <div>
            {/* Back button */}
            <button
              type="button"
              onClick={onNavigateHome}
              className="mb-16 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#FF7A00]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to studio
            </button>

            {/* Hero text */}
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3 text-[#FF7A00]">
                <Box className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em]">Smart Layout</span>
              </div>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
                A spatial workspace for your next project.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
                Explore an interactive 3D colony master plan. Click plots, toggle status, search by number, and overlay satellite imagery — all in the browser.
              </p>
            </div>
          </div>

          {/* Demo card */}
          <div className="mt-20 border border-white/15 bg-white/[0.03] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Live Demo</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2ec4c1]/30 bg-[#2ec4c1]/10 px-3 py-1 text-xs font-semibold text-[#2ec4c1]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2ec4c1]" />
                Interactive
              </span>
            </div>

            {/* Clickable demo card */}
            <button
              type="button"
              id="open-colony-map-demo"
              onClick={() => setIsOpen(true)}
              className="group relative w-full overflow-hidden border border-white/10 bg-[#0c0e0c] transition-all duration-300 hover:border-[#2ec4c1]/40 hover:shadow-[0_0_60px_rgba(46,196,193,0.08)] focus-visible:outline-2 focus-visible:outline-[#FF7A00]"
              style={{ minHeight: 300 }}
            >
              {/* Animated grid background */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute", inset: 0, opacity: 0.12,
                  backgroundImage:
                    "linear-gradient(rgba(46,196,193,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(46,196,193,0.5) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                }}
              />

              {/* Pseudo 3D plot squares decoration */}
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, transform: "rotateX(52deg) rotateZ(-25deg) scale(1.1)", transformOrigin: "center" }}>
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 36, height: 36, borderRadius: 4,
                        background: i === 7 || i === 12 ? "#ffcf33" : i === 2 || i === 18 ? "#1e90ff" : "#5cc46c",
                        opacity: 0.7 + (i % 3) * 0.1,
                        boxShadow: "0 4px 0 rgba(0,0,0,0.5)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Centre content */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-6 py-20 px-6 text-center">
                <div className="flex items-center justify-center rounded-2xl border border-[#2ec4c1]/25 bg-[#2ec4c1]/10 p-5 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Box className="h-10 w-10 text-[#2ec4c1]" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Colony Master Plan — Interactive 3D Layout</p>
                  <p className="mt-2 text-sm text-white/50">Drag to rotate · Scroll to zoom · Click plots to inspect</p>
                </div>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {FEATURES.map((f) => (
                    <span
                      key={f.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                    >
                      {f.icon}{f.label}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/10 px-6 py-3 text-sm font-semibold text-[#FF7A00] transition-all duration-200 group-hover:bg-[#FF7A00] group-hover:text-white group-hover:border-[#FF7A00]">
                  Launch 3D Demo
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
