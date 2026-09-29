import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { Code2, Cpu, Wrench, Compass, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'dev' | 'ai' | 'tools'>('all');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const skillApplications: Record<string, string> = {
    'TypeScript': 'Full type-safety across StudyOS, BILLA AI, and custom backend APIs.',
    'React 19': 'Concurrent features, transitions, and component architectures.',
    'Next.js': 'Server-side rendering, API routes, and edge runtime optimization.',
    'Tailwind CSS': 'Design system tokens, custom theme scales, zero CSS bloat.',
    'Node.js': 'Express API proxies, background tasks, and webhook listeners.',
    'Python': 'Data scripting, machine learning utilities, and automation bots.',
    'Gemini API': 'Multimodal visual analysis, OCR parsing, and structured reasoning.',
    'AI Studio': 'Prompt prototyping, system instructions, and schema definitions.',
    'Multimodal Vision': 'Extracting structured data from camera photos and receipts.',
    'Prompt Chains': 'Sequential LLM reasoning pipelines for educational cards.',
    'Git & GitHub': 'Version control, branch protection, CI/CD GitHub Actions.',
    'Linux / Termux': 'Mobile terminal builds, shell scripting, package management.',
    'Vercel': 'Edge deployment, serverless functions, automated previews.',
    'Full-Stack Architecture': 'End-to-end user experience, data persistence, and auth.'
  };

  const skillCategories = [
    {
      id: 'dev',
      title: 'Development',
      icon: Code2,
      accent: 'border-cyan-500/30 text-cyan-400',
      description: 'Languages and client-side frameworks for shipping responsive, robust web & mobile products.',
      items: PERSONAL_INFO.skills.development
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      icon: Cpu,
      accent: 'border-blue-500/30 text-blue-400',
      description: 'Integrating multimodal models, prompt chains, and vision AI into practical customer workflows.',
      items: PERSONAL_INFO.skills.ai
    },
    {
      id: 'tools',
      title: 'Tools & Environments',
      icon: Wrench,
      accent: 'border-amber-500/30 text-amber-400',
      description: 'Command line, system administration, version control, and production cloud hosting.',
      items: PERSONAL_INFO.skills.tools
    },
    {
      id: 'focus',
      title: 'Focus Areas',
      icon: Compass,
      accent: 'border-indigo-500/30 text-indigo-400',
      description: 'Core disciplines of practice and user-centered product architecture.',
      items: PERSONAL_INFO.skills.focus
    }
  ];

  const filteredCategories = selectedFilter === 'all'
    ? skillCategories
    : skillCategories.filter((c) => c.id === selectedFilter);

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 relative"
    >
      {/* Cinematic Scroll-Triggered Expanding Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent origin-left mb-8"
      />

      {/* Header with Scroll-Triggered Motion & Filter Tabs */}
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
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Skills & Craft
          </h2>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'dev', label: 'Development' },
            { id: 'ai', label: 'AI Systems' },
            { id: 'tools', label: 'Tools & Cloud' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playBlip(550, 0.03);
                setSelectedFilter(tab.id as any);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                selectedFilter === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              data-cursor
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Active Skill Insight Card (Appears when user clicks or hovers a skill) */}
      {activeSkill && skillApplications[activeSkill] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-center justify-between gap-3 text-xs font-mono"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-cyan-300 font-bold">{activeSkill}:</span>
            <span className="text-slate-200">{skillApplications[activeSkill]}</span>
          </div>
          <button
            onClick={() => setActiveSkill(null)}
            className="text-slate-400 hover:text-white text-[11px]"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Clean Bento Grid with Staggered Scroll-Triggered Reveals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.3, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-slate-950 border ${cat.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 group-hover:text-cyan-400 transition-colors">
                    Active
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Skill Items with Interactive Click-to-Inspect */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                {cat.items.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      sound.playBlip(620, 0.03);
                      setActiveSkill(activeSkill === item ? null : item);
                    }}
                    className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-colors text-left ${
                      activeSkill === item
                        ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                    data-cursor
                    title="Click to view real-world application"
                  >
                    <span>{item}</span>
                    <span className="text-slate-600 font-mono text-[10px]">●</span>
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};
