import React, { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { PERSONAL_INFO, PROJECTS } from '../../data/portfolio';
import { ArrowDown, ArrowUpRight, CheckCircle2, ChevronDown, Code, Eye, Cpu } from 'lucide-react';
import { sound } from '../../utils/audio';

interface HeroProps {
  onOpenContact: () => void;
}

// Sophisticated Multi-Stage Cinematic Entrance Variants
const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const stageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const consoleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.96,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const scrollPromptVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'preview' | 'schema'>('preview');
  const showcaseProjects = PROJECTS.slice(0, 3);
  const currentProject = showcaseProjects[activeTab];

  const projectSchemas: Record<string, { endpoint: string; runtime: string; pipeline: string[] }> = {
    'studyos': {
      endpoint: '/api/v1/adaptive-flashcards/stream',
      runtime: 'Edge Runtime · Gemini 2.5 Flash',
      pipeline: [
        'User uploads textbook / lecture PDF',
        'Gemini Vision chunks into semantic cards',
        'SuperMemo SM-2 spaced repetition decay',
        'Sub-150ms client-side cache & sync'
      ]
    },
    'billa-ai': {
      endpoint: '/api/ocr/multimodal-receipt-parser',
      runtime: 'Vercel Serverless · Multimodal Vision',
      pipeline: [
        'Receipt snapshot captured on mobile camera',
        'Structured schema validation via Zod',
        'Automated split ledger & FX currency math',
        'Zero client-side credential storage'
      ]
    },
    'atomic-lab': {
      endpoint: '/shaders/orbital-electrons.frag',
      runtime: 'WebGL 2.0 · Three.js · 60 FPS',
      pipeline: [
        'Bohr-Sommerfeld electron shell models',
        'Interactive quantum orbital energy levels',
        'Physically-based ambient particle mesh',
        'Pointer raycaster with reactive collision'
      ]
    }
  };

  const schemaInfo = projectSchemas[currentProject.id] || projectSchemas['studyos'];

  return (
    <motion.section
      id="hero"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Typographic Hierarchy & Staggered Stages */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Stage 1: Subtle System Status Ticker */}
          <motion.div
            variants={stageVariants}
            className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Software Engineer & Systems Builder</span>
          </motion.div>

          {/* Stage 2 & 3: Main Headline and Role Title */}
          <div className="space-y-2">
            <motion.h1
              variants={stageVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.12] font-display"
            >
              PROSPER{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                NDUBUIZU
              </span>
            </motion.h1>

            <motion.p
              variants={stageVariants}
              className="text-xs sm:text-sm font-mono text-cyan-400 font-medium tracking-wide"
            >
              {PERSONAL_INFO.role}
            </motion.p>
          </div>

          {/* Stage 4: High-Impact Core Positioning */}
          <motion.p
            variants={stageVariants}
            className="text-lg sm:text-xl md:text-2xl text-slate-200 font-display font-medium max-w-xl leading-snug"
          >
            {PERSONAL_INFO.positioning}
          </motion.p>

          {/* Stage 5: Narrative Description */}
          <motion.p
            variants={stageVariants}
            className="text-slate-400 text-sm max-w-lg leading-relaxed"
          >
            I’m a student developer and builder who enjoys taking ideas and turning them into real, working products across web applications, AI-powered systems, and interactive tech.
          </motion.p>

          {/* Stage 6: Interactive CTAs */}
          <motion.div
            variants={stageVariants}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={() => sound.playBlip(560, 0.05)}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-400/20 active:scale-95"
              data-cursor
              data-cursor-label="EXPLORE"
            >
              <span>View My Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                sound.playBlip(620, 0.05);
                onOpenContact();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 rounded-xl transition-all border border-slate-800 hover:border-slate-700 active:scale-95"
              data-cursor
              data-cursor-label="TALK"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Stage 8: Right Column Interactive Architecture Console */}
        <motion.div
          variants={consoleVariants}
          className="lg:col-span-5"
        >
          <div className="relative group rounded-2xl bg-gradient-to-b from-[#090e1b] via-[#070b16] to-[#04060e] border border-cyan-500/30 p-5 sm:p-6 shadow-2xl shadow-cyan-950/40">
            {/* Ambient subtle corner glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header: Live Systems Terminal & View Switcher */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs font-semibold text-white tracking-wide">
                  SYSTEM CONSOLE
                </span>
              </div>

              {/* Toggle View Mode: Preview vs Architecture */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800">
                <button
                  onClick={() => {
                    sound.playBlip(500, 0.03);
                    setViewMode('preview');
                  }}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  data-cursor
                >
                  <Eye className="w-3 h-3" />
                  <span>UI</span>
                </button>
                <button
                  onClick={() => {
                    sound.playBlip(550, 0.03);
                    setViewMode('schema');
                  }}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    viewMode === 'schema'
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  data-cursor
                >
                  <Code className="w-3 h-3" />
                  <span>Pipeline</span>
                </button>
              </div>
            </div>

            {/* Project Switcher Tabs */}
            <div className="flex gap-1.5 p-1 my-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
              {showcaseProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.playBlip(600 + idx * 50, 0.04);
                    setActiveTab(idx);
                  }}
                  className={`flex-1 py-1.5 px-2 text-xs font-mono rounded-lg transition-all truncate text-center ${
                    activeTab === idx
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  data-cursor
                >
                  {p.title}
                </button>
              ))}
            </div>

            {/* Current Project Live Peek or Pipeline View */}
            <div className="space-y-4">
              {viewMode === 'preview' ? (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-white font-bold font-display block">
                        {currentProject.title}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono block">
                        {currentProject.category}
                      </span>
                    </div>
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playBlip(650, 0.05)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-400 text-slate-950 text-[11px] font-semibold hover:bg-cyan-300 transition-colors shadow-sm"
                      data-cursor
                      data-cursor-label="LAUNCH"
                    >
                      <span>Launch</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="aspect-[16/9] rounded-xl p-3.5 bg-slate-950/95 border border-cyan-500/30 font-mono text-[11px] flex flex-col justify-between overflow-hidden">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-1.5">
                      <span className="text-cyan-400 font-semibold">{schemaInfo.endpoint}</span>
                      <span className="text-[9px] text-slate-500">{schemaInfo.runtime}</span>
                    </div>
                    <div className="pt-1.5 space-y-1 text-slate-300">
                      {schemaInfo.pipeline.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 shrink-0">→</span>
                          <span className="line-clamp-1">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Cpu className="w-3 h-3" /> <span>Real Production Pipeline</span>
                    </span>
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      Test Live ↗
                    </a>
                  </div>
                </div>
              )}

              {/* Quick Specs / Capabilities */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {currentProject.description}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Slop · Verified Builds</span>
              </span>
              <a
                href="#projects"
                onClick={() => sound.playBlip(550, 0.04)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                data-cursor
              >
                All Projects ↓
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Stage 9: Subtle Scroll Transition Prompt */}
      <motion.div
        variants={scrollPromptVariants}
        className="pt-12 hidden md:flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500"
      >
        <span>Scroll to Explore</span>
        <ChevronDown className="w-3 h-3 text-cyan-400 animate-bounce" />
      </motion.div>
    </motion.section>
  );
};
