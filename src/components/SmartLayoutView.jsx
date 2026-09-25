import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Box,
  Layers,
  MousePointer2,
  Map as MapIcon,
  Search,
  ArrowRight,
  CheckCircle2,
  Compass,
  Phone,
  MessageCircle,
  Maximize2,
  FileText,
  Sliders,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Smartphone,
  Ruler,
  Building2,
  Eye,
  ChevronDown,
  ChevronUp,
  Share2,
} from "lucide-react";
import { PLOT_DIMENSIONS } from "../colonymap/plotDimensions";

// Sample highlighted plots for interactive explorer
const SAMPLE_PLOTS = [
  { id: 1, type: "Corner Plot", facing: "North-East", desc: "Prime entrance corner plot with dual road access" },
  { id: 14, type: "Park-Facing Villa Plot", facing: "East-facing", desc: "Direct frontage facing the central landscaped park" },
  { id: 24, type: "Standard Residential", facing: "North-facing", desc: "Ideal rectangular layout with wide 12m approach road" },
  { id: 88, type: "Commercial / Avenue", facing: "West-facing", desc: "Wide road frontage suitable for high-visibility development" },
  { id: 112, type: "Quiet Cul-de-sac", facing: "South-facing", desc: "Peaceful residential cul-de-sac location with zero traffic" },
  { id: 162, type: "Premium Estate Plot", facing: "North-facing", desc: "Generous frontage with proximity to community amenities" },
];

const FEATURES_LIST = [
  {
    icon: <Box className="h-6 w-6 text-[#FF7A00]" />,
    title: "Interactive 3D Spatial Master Plan",
    badge: "Spacer & Plotex Inspired",
    description:
      "Transform flat, static paper maps into a living 3D digital model. Buyers orbit, tilt, pan, and zoom at 60 FPS in any browser with zero lag.",
  },
  {
    icon: <Ruler className="h-6 w-6 text-[#10B981]" />,
    title: "Exact Cadastral Boundary Measurements",
    badge: "Plotex Inspired",
    description:
      "Auto-calculated North, East, South, and West edge dimensions directly from sanctioned AutoCAD DWG/DXF drawings. Eliminates on-site confusion.",
  },
  {
    icon: <Layers className="h-6 w-6 text-[#38BDF8]" />,
    title: "Real-Time Inventory Status",
    badge: "Spacer & Blindersoe Inspired",
    description:
      "Color-coded plot availability (Available in Emerald, Sold in Coral, Reserved in Amber). Prevents double-booking and keeps brokers synchronized.",
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-[#25D366]" />,
    title: "1-Click WhatsApp Lead Generator",
    badge: "High Conversion",
    description:
      "When a buyer taps a plot, WhatsApp opens with the exact plot number, boundary dimensions, and area pre-filled for immediate sales closure.",
  },
  {
    icon: <Globe2 className="h-6 w-6 text-[#F59E0B]" />,
    title: "NRI & Remote Investor Transparency",
    badge: "Blindersoe Inspired",
    description:
      "Built-in directional compass (Vastu orientation), satellite basemap overlay, and sanctioned brochure download empower remote buyers to book with confidence.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-[#A78BFA]" />,
    title: "Zero App Download • Universal Link",
    badge: "Instant Share",
    description:
      "No heavy 3D apps or plugins required. Runs instantly on WhatsApp in-app browser, Safari (iOS), Chrome (Android), and desktop PCs via one link.",
  },
];

const FAQS = [
  {
    q: "How does our CAD blueprint get converted into this 3D layout?",
    a: "You simply provide your sanctioned layout plan in AutoCAD format (DWG, DXF) or a high-resolution approved PDF. Our computational pipeline extracts the exact plot boundaries, road networks, open spaces, and amenities, reconstructing a pixel-accurate 3D digital twin in 48 hours.",
  },
  {
    q: "Does this require our buyers to install an app or download software?",
    a: "Not at all. The entire interactive 3D layout runs natively in the web browser using lightweight Canvas 2D perspective acceleration. It loads in under 2 seconds even over 4G mobile connections.",
  },
  {
    q: "Can we update plot availability status as sales happen?",
    a: "Yes. You have full control over inventory status. Plots can be marked as Available, Booked, or Sold in real time so your sales agents and remote buyers always see the live inventory.",
  },
  {
    q: "Is our proprietary layout and CAD data protected?",
    a: "Absolutely. All layout geometry is securely converted and hosted under your own custom domain or project portal, with your own branding, logos, and direct WhatsApp contact routing.",
  },
];

export default function SmartLayoutView({ onNavigateHome, onNavigateBakdeVihar }) {
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  // Selected plot for interactive dimension explorer widget
  const [selectedPlotId, setSelectedPlotId] = useState(1);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleOpenBakdeVihar = () => {
    if (onNavigateBakdeVihar) {
      onNavigateBakdeVihar();
    } else {
      window.location.hash = "#/bakde-vihar";
    }
  };

  // Handle slider drag
  const handleSliderMove = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    handleSliderMove(e.clientX);
  };

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isDragging) return;
      handleSliderMove(e.clientX);
    };
    const onPointerUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging, handleSliderMove]);

  // Current plot dimension lookup
  const currentPlotSpec = PLOT_DIMENSIONS[selectedPlotId] || {
    edges: [10.5, 18.5, 12.5, 18.5],
    areaM2: 226.8,
    areaSqFt: 2442,
  };
  const currentPlotMeta = SAMPLE_PLOTS.find((p) => p.id === selectedPlotId) || SAMPLE_PLOTS[0];

  const whatsappInquiryUrl = `https://wa.me/916265597717?text=${encodeURIComponent(
    `Hello Ar. Aman Verma, I am interested in inquiring about Plot #${selectedPlotId} (${currentPlotSpec.areaSqFt} sq.ft) in 3D Layout.`
  )}`;

  return (
    <div className="min-h-screen bg-[#08090A] text-[#E2E8F0] selection:bg-[#FF7A00] selection:text-white font-sans">
      {/* Top Floating Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08090A]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {onNavigateHome ? (
              <button
                type="button"
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-[#FF7A00]/50 hover:bg-[#FF7A00]/10 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-[#FF7A00]" />
                <span>Back to Studio</span>
              </button>
            ) : (
              <a
                href="/#home"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-[#FF7A00]/50 hover:bg-[#FF7A00]/10 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-[#FF7A00]" />
                <span>Back to Studio</span>
              </a>
            )}
            <div className="hidden h-5 w-px bg-white/15 sm:block" />
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 font-bold text-xs">
                AVA
              </div>
              <span className="text-sm font-bold tracking-wide text-white">AVA SMART LAYOUT</span>
              <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-400 uppercase sm:inline-block">
                3D PropTech Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/916265597717?text=Hi%20Ar.%20Aman%20Verma,%20I%20want%20to%20convert%20my%20real%20estate%20plot%20layout%20into%20an%20interactive%203D%20map."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500 hover:text-white sm:inline-flex"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp Demo</span>
            </a>

            <button
              type="button"
              onClick={handleOpenBakdeVihar}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF7A00] px-4 py-1.5 text-xs font-bold text-white shadow-[0_4px_20px_rgba(255,122,0,0.35)] transition-all hover:bg-[#e06c00] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Explore 3D</span>
            </button>
          </div>
        </div>
      </header>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
          {/* Subtle Ambient Background Gradients */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#FF7A00]/15 via-emerald-500/10 to-transparent blur-[120px]" />
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,122,0,0.2) 1px, transparent 1px), radial-gradient(rgba(56,189,248,0.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              backgroundPosition: "0 0, 16px 16px",
            }}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#FF7A00] uppercase backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>Next-Gen PropTech • 3D Plot Visualization</span>
              </div>

              {/* Main Headline */}
              <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.12]">
                Sell Real Estate Plots Faster With{" "}
                <span className="bg-gradient-to-r from-[#FF7A00] via-[#FFA048] to-[#FF5500] bg-clip-text text-transparent">
                  Interactive 3D Maps
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                Replace confusing 2D blueprints and static spreadsheets with a single, high-converting 3D link.
                Buyers inspect real-time availability, measure exact N/E/S/W boundary dimensions, and inquire over WhatsApp in seconds.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleOpenBakdeVihar}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#FF7A00] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_30px_rgba(255,122,0,0.4)] transition-all hover:bg-[#e06c00] hover:scale-105"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span>Launch Live 3D Master Plan</span>
                </button>

                <a
                  href="#comparison"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-[#FF7A00]/50 hover:bg-white/10"
                >
                  <Eye className="h-4 w-4 text-[#FF7A00]" />
                  <span>Compare 2D Blueprint vs 3D</span>
                </a>
              </div>

              {/* Social Proof & Metrics */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 sm:gap-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>280+ Sanctioned Plots Digitized</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Exact AutoCAD CAD Measurements</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>100% Mobile Ready • 0 Downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Instant WhatsApp Leads</span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE 3D HERO PREVIEW CARD */}
            <div className="mt-14 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-2 shadow-2xl backdrop-blur-xl sm:p-3">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#0B0F19]">
                {/* 3D Master Plan Image */}
                <img
                  src="/assets/plot-3d-render.jpg"
                  alt="AVA Smart Layout - 3D Interactive Master Plan Visualization"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Overlaid Live Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/40 bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                    <span>Project: Malewad Plotted Layout</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                    245 Available • 36 Sold
                  </span>
                </div>

                <div className="absolute top-4 right-4 hidden sm:block">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
                    <Compass className="h-3.5 w-3.5 text-[#FF7A00]" />
                    North-Aligned
                  </span>
                </div>

                {/* Center Launch Overlay Trigger */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center backdrop-blur-[2px] transition-all hover:bg-black/20">
                  <button
                    type="button"
                    onClick={handleOpenBakdeVihar}
                    className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-[#FF7A00] text-white shadow-[0_0_50px_rgba(255,122,0,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label="Open 3D interactive viewer"
                  >
                    <Box className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="absolute -bottom-8 whitespace-nowrap text-xs font-bold tracking-widest text-white uppercase drop-shadow-md">
                      Click to Explore 3D
                    </span>
                  </button>
                  <p className="mt-12 text-sm font-medium text-white/90 drop-shadow">
                    Rotate • Zoom • Inspect Individual Plots • Direct WhatsApp Booking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE BEFORE / AFTER SLIDER (PLOTEX INSPIRED) */}
        <section id="comparison" className="border-t border-white/10 bg-[#0C0E12] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF7A00]">
                Visual Transformation
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                2D Paper Blueprint vs. Living 3D Spatial Twin
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 sm:text-base">
                Drag the interactive slider below to see how our engineering pipeline converts flat, hard-to-read CAD
                drawings into an intuitive 3D sales experience that buyers understand instantly.
              </p>
            </div>

            {/* Slider Container */}
            <div className="mt-12 mx-auto max-w-5xl">
              <div
                ref={sliderRef}
                onPointerDown={handlePointerDown}
                className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
              >
                {/* 3D After Image (Background layer) */}
                <img
                  src="/assets/plot-3d-render.jpg"
                  alt="3D Digital Master Plan"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 2D Before Image (Clipped layer on left) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src="/layout-plan.jpg"
                    alt="2D Sanctioned Paper Blueprint"
                    className="absolute inset-0 h-full w-full object-contain bg-[#EAE8E2]"
                    style={{
                      width: sliderRef.current ? sliderRef.current.clientWidth : "100%",
                      maxWidth: "none",
                    }}
                  />
                </div>

                {/* Draggable Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 z-20 flex w-1 flex-col items-center bg-[#FF7A00] shadow-[0_0_15px_rgba(255,122,0,0.8)]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#FF7A00] text-white shadow-2xl transition-transform hover:scale-110 active:scale-95">
                    <Sliders className="h-5 w-5" />
                  </div>
                </div>

                {/* Labels */}
                <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-lg bg-black/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/15">
                  ← 2D Sanctioned Blueprint
                </div>
                <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-lg bg-[#FF7A00] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  AVA 3D Spatial Master Plan →
                </div>
              </div>

              {/* Slider Preset Controls */}
              <div className="mt-5 flex items-center justify-center gap-3 text-xs">
                <span className="text-white/40">Quick Presets:</span>
                <button
                  type="button"
                  onClick={() => setSliderPos(15)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-white/70 hover:border-[#FF7A00] hover:text-white"
                >
                  Show 3D View (85%)
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPos(50)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-white/70 hover:border-[#FF7A00] hover:text-white"
                >
                  50 / 50 Split
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPos(85)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-white/70 hover:border-[#FF7A00] hover:text-white"
                >
                  Show 2D Blueprint (85%)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE PLOT DIMENSION EXPLORER (BLINDERSOE INSPIRED) */}
        <section className="py-20 sm:py-28 bg-[#08090A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Context & Explanations */}
              <div className="lg:col-span-5">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Precision Engineering
                </span>
                <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                  Exact Boundary Edges & Vastu Facing
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                  Remote and NRI buyers demand total transparency. Our tool displays precise North, East, South, and West
                  boundary edge measurements derived straight from the sanctioned CAD coordinate geometry.
                </p>

                {/* Plot Selector Chips */}
                <div className="mt-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/40">
                    Select a sample plot to inspect:
                  </label>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {SAMPLE_PLOTS.map((plot) => (
                      <button
                        key={plot.id}
                        type="button"
                        onClick={() => setSelectedPlotId(plot.id)}
                        className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                          selectedPlotId === plot.id
                            ? "border-[#FF7A00] bg-[#FF7A00]/15 text-white shadow-[0_0_20px_rgba(255,122,0,0.2)]"
                            : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span className="text-xs font-bold">Plot #{plot.id}</span>
                        <span className="text-[10px] opacity-75">{plot.facing}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleOpenBakdeVihar}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-white/20 cursor-pointer"
                  >
                    <Search className="h-4 w-4 text-[#FF7A00]" />
                    <span>Search Any of 280+ Plots in 3D</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Plot Spec Card */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#121620] to-[#0A0D14] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-[#FF7A00] uppercase">
                        SELECTED PLOT SPECIFICATIONS
                      </span>
                      <h3 className="mt-1 text-3xl font-extrabold text-white">
                        Plot #{selectedPlotId}{" "}
                        <span className="text-base font-normal text-white/50">({currentPlotMeta.type})</span>
                      </h3>
                      <p className="mt-1 text-xs text-white/60">{currentPlotMeta.desc}</p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Status: Available
                    </span>
                  </div>

                  {/* Dimension Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                      <span className="text-[11px] font-semibold text-white/50 uppercase">Total Area (Sq.Ft)</span>
                      <p className="mt-1 text-xl font-bold text-[#FF7A00]">
                        {currentPlotSpec.areaSqFt.toLocaleString()}{" "}
                        <span className="text-xs font-normal text-white/60">ft²</span>
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                      <span className="text-[11px] font-semibold text-white/50 uppercase">Total Area (Sq.M)</span>
                      <p className="mt-1 text-xl font-bold text-white">
                        {currentPlotSpec.areaM2.toFixed(1)}{" "}
                        <span className="text-xs font-normal text-white/60">m²</span>
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                      <span className="text-[11px] font-semibold text-white/50 uppercase">Orientation</span>
                      <p className="mt-1 text-base font-bold text-emerald-400">{currentPlotMeta.facing}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                      <span className="text-[11px] font-semibold text-white/50 uppercase">Access Road</span>
                      <p className="mt-1 text-base font-bold text-sky-400">12.0 Meter Wide</p>
                    </div>
                  </div>

                  {/* 4 Boundary Edges Table */}
                  <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                      Cadastral Boundary Dimensions (from Sanctioned CAD):
                    </span>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
                        <span className="text-white/50">North Edge:</span>
                        <b className="text-white">{currentPlotSpec.edges[0]?.toFixed(2) || "12.50"} m</b>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
                        <span className="text-white/50">East Edge:</span>
                        <b className="text-white">{currentPlotSpec.edges[1]?.toFixed(2) || "18.50"} m</b>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
                        <span className="text-white/50">South Edge:</span>
                        <b className="text-white">{currentPlotSpec.edges[2]?.toFixed(2) || "12.50"} m</b>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
                        <span className="text-white/50">West Edge:</span>
                        <b className="text-white">{currentPlotSpec.edges[3]?.toFixed(2) || "18.50"} m</b>
                      </div>
                    </div>
                  </div>

                  {/* CTAs Inside Card */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 sm:flex-none"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Book Plot #{selectedPlotId} via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleOpenBakdeVihar}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs font-semibold text-white transition-all hover:bg-white/10 cursor-pointer"
                    >
                      <Eye className="h-4 w-4 text-[#FF7A00]" />
                      <span>View in Full 3D Layout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: KEY FEATURES MATRIX (BEST OF ALL 3 PLATFORMS) */}
        <section className="border-t border-white/10 bg-[#0C0E12] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF7A00]">
                Engineered For Results
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                Why Developers &amp; Brokers Choose AVA Smart Layout
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 sm:text-base">
                Everything required to eliminate sales friction, accelerate booking decisions, and provide complete clarity to buyers.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES_LIST.map((feat, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF7A00]/40 hover:bg-white/[0.07] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-transform duration-300 group-hover:scale-110">
                      {feat.icon}
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-white/50">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-white transition-colors group-hover:text-[#FF7A00]">
                    {feat.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/60">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: 48-HOUR CONVERSION PIPELINE (HOW IT WORKS) */}
        <section className="py-20 sm:py-28 bg-[#08090A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Simple Onboarding
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                From Sanctioned CAD to Live 3D Link in 48 Hours
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 sm:text-base">
                No complex 3D software to learn. We take your blueprint and handle the complete spatial digitization.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Send CAD or PDF",
                  desc: "Share your sanctioned master plan in DWG, DXF, or PDF format with boundary details.",
                },
                {
                  step: "02",
                  title: "Spatial Vectorization",
                  desc: "Our engine maps individual plot polygons, roads, park boundaries, and dimensions.",
                },
                {
                  step: "03",
                  title: "48-Hour Deployment",
                  desc: "Your interactive 3D layout goes live on a fast, mobile-friendly link with your logo.",
                },
                {
                  step: "04",
                  title: "Share & Sell Faster",
                  desc: "Send via WhatsApp, embed in brochures, and generate qualified buyer inquiries.",
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-[#FF7A00]/30"
                >
                  <span className="text-3xl font-black text-[#FF7A00]/40">{s.step}</span>
                  <h3 className="mt-3 text-base font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ ACCORDION */}
        <section className="border-t border-white/10 bg-[#0C0E12] py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mt-3 text-sm text-white/60">
                Everything you need to know about implementing interactive 3D layouts for your plotting schemes.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white sm:text-base"
                  >
                    <span>{faq.q}</span>
                    {activeFaq === idx ? (
                      <ChevronUp className="h-5 w-5 text-[#FF7A00] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white/40 flex-shrink-0" />
                    )}
                  </button>
                  {activeFaq === idx && (
                    <div className="border-t border-white/5 px-5 pb-5 pt-3 text-sm leading-relaxed text-white/70">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CALL TO ACTION */}
        <section className="relative overflow-hidden py-20 sm:py-28 bg-[#08090A]">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#FF7A00]/10 via-transparent to-transparent" />
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <span className="rounded-full border border-[#FF7A00]/30 bg-[#FF7A00]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
              Get Started Today
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-5xl">
              Ready to Turn Your Plotted Scheme Into an Interactive 3D Experience?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/70">
              Send us your layout CAD drawing or PDF. We will create a free sample 3D demonstration of your project.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/916265597717?text=Hi%20Ar.%20Aman%20Verma,%20I%20would%20like%20a%20free%203D%20layout%20demo%20for%20my%20plotting%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Request Free 3D Demo on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleOpenBakdeVihar}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 cursor-pointer"
              >
                <Maximize2 className="h-4 w-4 text-[#FF7A00]" />
                <span>Launch 3D Layout</span>
              </button>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="border-t border-white/10 bg-black py-8 text-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} Aman Verma Architects. AVA Smart Layout 3D Engine. All rights reserved.</p>
        </footer>
      </div>
  );
}
