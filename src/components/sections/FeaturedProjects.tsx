import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS, Project } from '../../data/portfolio';
import { ExternalLink, Github, Check, ArrowUpRight, Cpu, Activity, Layout, Eye } from 'lucide-react';
import { sound } from '../../utils/audio';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  // Track active view mode per project: 'ui' | 'architecture' | 'metrics'
  const [activeViews, setActiveViews] = useState<Record<string, 'ui' | 'architecture' | 'metrics'>>({
    'studyos': 'ui',
    'billa-ai': 'ui',
    'atomic-lab': 'ui',
    'termux-dev': 'ui'
  });

  const setProjectView = (projectId: string, view: 'ui' | 'architecture' | 'metrics') => {
    sound.playBlip(560, 0.03);
    setActiveViews((prev) => ({ ...prev, [projectId]: view }));
  };

  const projectDeepData: Record<string, {
    specs: { label: string; value: string }[];
    architecture: string[];
    metrics: { label: string; value: string; desc: string }[];
  }> = {
    'studyos': {
      specs: [
        { label: 'LLM Model', value: 'Gemini 2.5 Flash' },
        { label: 'State Sync', value: 'Local IndexedDB + Supabase' },
        { label: 'Latency', value: '142ms Streaming' }
      ],
      architecture: [
        'Client-side PDF text extraction using Web Workers',
        'Gemini prompt chains generating atomic Q&A flashcards',
        'SuperMemo SM-2 interval algorithm for long-term retention',
        'Offline-capable PWA architecture with optimistic caching'
      ],
      metrics: [
        { label: '142ms', value: 'Stream Latency', desc: 'Average time-to-first-token on edge generation' },
        { label: '100%', value: 'Offline Ready', desc: 'Retains all study decks without active network' },
        { label: '0s', value: 'Data Lock-in', desc: 'Direct export to Anki (.apkg) & JSON schemas' }
      ]
    },
    'billa-ai': {
      specs: [
        { label: 'Vision Model', value: 'Gemini Multimodal Vision' },
        { label: 'Parser Engine', value: 'Structured Zod Schemas' },
        { label: 'Security', value: 'Zero Server-Side Storage' }
      ],
      architecture: [
        'Camera capture optimized for varying angles and lighting',
        'Vision inference extracting line items, tax, and FX totals',
        'Client-side split calculation with equal & custom weightings',
        'Encrypted transient payloads; zero private document retention'
      ],
      metrics: [
        { label: '99.4%', value: 'Schema Accuracy', desc: 'On multi-currency itemized receipts' },
        { label: '< 2.1s', value: 'Parse Velocity', desc: 'From mobile camera shutter to structured split' },
        { label: '0 Bytes', value: 'Data Retained', desc: 'Strict zero-retention ephemeral processing' }
      ]
    },
    'atomic-lab': {
      specs: [
        { label: 'Graphics API', value: 'WebGL 2.0 / Three.js' },
        { label: 'Target Framerate', value: 'Locked 60 FPS' },
        { label: 'Shader Pipeline', value: 'GLSL Custom Orbitals' }
      ],
      architecture: [
        'Procedural electron probability cloud generator',
        'Interactive quantum energy level orbital transitions',
        'GPU-instanced particle clouds reacting to pointer raycasts',
        'Zero external heavy assets; 100% computed mathematically'
      ],
      metrics: [
        { label: '60 FPS', value: 'Render Target', desc: 'Smooth performance across mobile and desktop' },
        { label: '48 KB', value: 'Core Payload', desc: 'Ultra-lightweight procedural WebGL footprint' },
        { label: '118', value: 'Periodic Elements', desc: 'Real physical atomic numbers and electron shells' }
      ]
    },
    'termux-dev': {
      specs: [
        { label: 'Host System', value: 'Android Linux Kernel' },
        { label: 'CLI Tooling', value: 'Bash, Vim, Node, Git' },
        { label: 'Port Forward', value: 'Localhost Web Previews' }
      ],
      architecture: [
        'Chrooted Linux environment running Node.js runtime',
        'Custom dotfiles optimizing mobile keyboard ergonomics',
        'Vite local dev server port-forwarded over WiFi ADB',
        'Git worktrees managed entirely through touch terminal'
      ],
      metrics: [
        { label: '100%', value: 'Mobile Native', desc: 'Full development cycles completed without a PC' },
        { label: '24/7', value: 'Portability', desc: 'Immediate bug fixes and prototype shipping anywhere' },
        { label: 'Zero', value: 'Excuses', desc: 'Proof that dedication and execution transcend hardware' }
      ]
    }
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-20 relative"
    >
      {/* Cinematic Scroll-Triggered Expanding Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent origin-left mb-8"
      />

      {/* Section Header with Scroll-Triggered Motion */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800"
      >
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Selected Works</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Featured Products & Systems
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          Not generic mockups. Real, shipped web applications and interactive architectures built to solve tangible problems.
        </p>
      </motion.div>

      {/* Editorial Project Showcase with Interactive In-Card Switchers */}
      <div className="space-y-24">
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 0;
          const currentView = activeViews[project.id] || 'ui';
          const deepData = projectDeepData[project.id] || projectDeepData['studyos'];

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Visual & Architecture Preview Container */}
              <div
                className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
              >
                <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                  {/* Subtle Accent Glow */}
                  <div
                    className="absolute -inset-1 opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-xl pointer-events-none"
                    style={{ backgroundColor: project.accentHex }}
                  />

                  {/* Top Mode Bar for the Card */}
                  <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 font-semibold">{project.title}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setProjectView(project.id, 'ui')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                          currentView === 'ui'
                            ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        data-cursor
                      >
                        <Layout className="w-3 h-3" />
                        <span>Interface</span>
                      </button>
                      <button
                        onClick={() => setProjectView(project.id, 'architecture')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                          currentView === 'architecture'
                            ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        data-cursor
                      >
                        <Cpu className="w-3 h-3" />
                        <span>Pipeline</span>
                      </button>
                      <button
                        onClick={() => setProjectView(project.id, 'metrics')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                          currentView === 'metrics'
                            ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        data-cursor
                      >
                        <Activity className="w-3 h-3" />
                        <span>Metrics</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content Area Based on Active View Mode */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    {currentView === 'ui' && (
                      <div
                        onClick={() => {
                          sound.playBlip(550, 0.05);
                          onSelectProject(project);
                        }}
                        className="w-full h-full cursor-pointer relative"
                        data-cursor
                        data-cursor-label="EXPLORE"
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} Preview`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                          <span>Inspect Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}

                    {currentView === 'architecture' && (
                      <div className="w-full h-full p-6 bg-[#03060c] flex flex-col justify-between font-mono text-xs text-slate-300 overflow-y-auto">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-cyan-400 border-b border-slate-800 pb-2">
                            <span className="font-bold">ENGINEERING ARCHITECTURE</span>
                            <span className="text-[10px] text-slate-500">PROD-VERIFIED</span>
                          </div>
                          <div className="space-y-2">
                            {deepData.architecture.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-2.5">
                                <span className="text-cyan-400 font-bold shrink-0">0{sIdx + 1}.</span>
                                <span className="leading-relaxed">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                          {deepData.specs.map((sp, idx) => (
                            <div key={idx}>
                              <span className="text-slate-500">{sp.label}: </span>
                              <span className="text-cyan-300 font-semibold">{sp.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentView === 'metrics' && (
                      <div className="w-full h-full p-6 bg-[#03060c] flex flex-col justify-center font-mono space-y-4">
                        <div className="text-xs text-cyan-400 uppercase tracking-widest font-bold border-b border-slate-800 pb-2">
                          PERFORMANCE & BENCHMARKS
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {deepData.metrics.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1"
                            >
                              <div className="text-xl sm:text-2xl font-bold text-white font-display">
                                {m.label}
                              </div>
                              <div className="text-xs font-semibold text-cyan-400">
                                {m.value}
                              </div>
                              <div className="text-[10px] text-slate-400 leading-snug">
                                {m.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Story & Meta Details */}
              <div
                className={`lg:col-span-5 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-500">
                    0{index + 1}
                  </span>
                  <span aria-hidden="true" className="text-slate-700">·</span>
                  <span className="text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-slate-300">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 pt-1">
                  {project.highlights.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playBlip(600, 0.05)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-400/20 active:scale-95"
                    data-cursor
                    data-cursor-label="LAUNCH"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playBlip(500, 0.04)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all border border-slate-800 hover:border-slate-700 active:scale-95"
                      data-cursor
                      data-cursor-label="CODE"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}

                  <button
                    onClick={() => {
                      sound.playBlip(540, 0.04);
                      onSelectProject(project);
                    }}
                    className="text-xs text-slate-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
                    data-cursor
                  >
                    Deep Dive
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
