import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { GraduationCap, Briefcase, Terminal, Smartphone, CheckCircle2, ChevronRight } from 'lucide-react';
import { sound } from '../../utils/audio';

export const AboutAndEducation: React.FC = () => {
  // Interactive Termux Mobile Simulator State
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'termux@android:~$ cat origins.txt',
    'I started in Iba, Lagos without a powerful laptop.',
    'I installed Termux on my smartphone, set up git & nodejs, and built late into the night.',
    'I learned that tools don’t define engineers—curiosity and execution do.'
  ]);
  const [commandInput, setCommandInput] = useState('');

  const executeCommand = (cmd: string) => {
    sound.playKeyClick();
    const cleanCmd = cmd.trim().toLowerCase();
    let response: string[] = [];

    switch (cleanCmd) {
      case 'whoami':
        response = [
          'Prosper Ndubuizu — Student Developer & AI Systems Builder',
          'Studying: B.Eng. Electrical & Electronics Eng (UI) & B.Sc. Comp Sci (UoPeople)',
          'Mission: “I turn ideas into things you can actually use.”'
        ];
        break;
      case 'projects':
      case 'ls projects':
        response = [
          'drwxr-xr-x studyos/      — Adaptive AI Flashcard Study Engine',
          'drwxr-xr-x billa-ai/     — Autonomous Receipt Splitter & Finance Bot',
          'drwxr-xr-x atomic-lab/   — 3D Interactive WebGL Quantum Simulations',
          'drwxr-xr-x termux-rig/   — Mobile Android Terminal Engineering Environment'
        ];
        break;
      case 'status':
        response = [
          '● System: All production builds operational (100% test pass rate)',
          '● Availability: Open for software engineering internships & product contracts',
          '● Location: Lagos, Nigeria (WAT / UTC+1)'
        ];
        break;
      case 'origins':
      case 'cat origins.txt':
        response = [
          '“I didn’t start with the perfect setup. I started with what I had.”',
          'Phone: Android + Termux Linux environment',
          'Stack: Git, Node.js, Vim, Vite mobile port',
          'Location: Iba, Lagos, Nigeria'
        ];
        break;
      case 'education':
      case 'degrees':
        response = [
          '1. University of Ibadan — B.Eng. Electrical & Electronics Eng (2026–Present)',
          '2. University of the People — B.Sc. Computer Science (2026–Present)',
          '3. Lagos State University International School (Graduated 2025)'
        ];
        break;
      case 'ackah':
      case 'experience':
        response = [
          'Ackah Law — Case Management Assistant (Remote, Nov 2025 – Sep 2026)',
          '• Legal documentation & case file synthesis',
          '• Cross-timezone remote collaboration & task autonomy',
          '• Structured communications and research'
        ];
        break;
      case 'skills':
      case 'stack':
        response = [
          'Core: React, TypeScript, Tailwind, Node, Python',
          'AI: Gemini API, AI Studio, Multimodal Vision, Prompt Chains',
          'Tools: Git, GitHub, Vercel, Ubuntu, Termux'
        ];
        break;
      case 'clear':
        setTerminalHistory(['termux@android:~$ ready.']);
        setCommandInput('');
        return;
      case 'help':
      default:
        response = [
          `Command '${cmd}' recognized. Available commands:`,
          '• whoami      — Bio & builder profile',
          '• projects    — Directory listing of shipped platforms',
          '• origins     — The story of coding from mobile in Iba',
          '• status      — Current system & internship availability',
          '• education   — Academic institutions & degrees',
          '• experience  — Ackah Law legal case management',
          '• stack       — Development & AI toolkit',
          '• clear       — Clear console'
        ];
        break;
    }

    setTerminalHistory((prev) => [...prev, `termux@android:~$ ${cmd}`, ...response]);
    setCommandInput('');
  };

  const quickCommands = ['cat origins.txt', 'education', 'experience', 'skills'];

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-24 relative snap-start scroll-mt-24"
    >
      {/* Cinematic Scroll-Triggered Expanding Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent origin-left mb-8"
      />

      {/* About Section Header & Narrative with Scroll-Triggered Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Identity & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Curious Builder. Dual-Degree Student.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            I don’t just write code for the sake of syntax. I build software to test how far an idea can go when engineered with care.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
          <p>
            I’m a student developer and builder who enjoys taking ideas and turning them into real things. I build web applications, AI-powered products, interactive experiences and experiments, while constantly learning and exploring new technology.
          </p>
          <p>
            I’m currently studying <strong className="text-white font-semibold">Electrical & Electronics Engineering at the University of Ibadan</strong> while also pursuing <strong className="text-white font-semibold">Computer Science online at the University of the People</strong>.
          </p>
          <p className="text-cyan-300/90 italic pt-2 border-t border-slate-800">
            “I started building before having the ideal setup and learned by building with what I had—often coding directly from a smartphone using Termux in Iba, Lagos.”
          </p>
        </div>
      </motion.div>

      {/* Interactive Termux Mobile Simulator with Scroll-Triggered Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>Interactive Artifact: The Termux Mobile Terminal</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickCommands.map((qCmd) => (
              <button
                key={qCmd}
                onClick={() => executeCommand(qCmd)}
                className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                data-cursor
              >
                ${qCmd}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#03060c] border border-cyan-500/30 overflow-hidden shadow-2xl font-mono text-xs sm:text-sm">
          {/* Terminal Window Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] text-slate-400 ml-2">termux@android ~/origins</span>
            </div>
            <span className="text-[10px] text-cyan-400/80">bash session</span>
          </div>

          {/* Terminal Output */}
          <div className="p-5 max-h-56 overflow-y-auto space-y-1.5 text-slate-300 leading-relaxed no-scrollbar">
            {terminalHistory.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('termux@android')
                    ? 'text-cyan-400 font-semibold pt-1'
                    : 'text-slate-300 pl-2'
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* Terminal Prompt Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (commandInput.trim()) executeCommand(commandInput);
            }}
            className="flex items-center gap-2 px-5 py-3 border-t border-slate-800/80 bg-slate-950/70"
          >
            <span className="text-cyan-400 font-bold shrink-0">termux@android:~$</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="type 'origins', 'education', 'experience', 'stack'..."
              className="w-full bg-transparent text-white focus:outline-none placeholder-slate-600 text-xs sm:text-sm"
            />
            <span className="w-2 h-4 bg-cyan-400 animate-terminal-blink" />
          </form>
        </div>
      </motion.div>

      {/* Education & Experience Grid with Scroll-Triggered Reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Education Section */}
        <motion.div
          id="education"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Background</span>
          </div>

          <h3 className="text-2xl font-bold text-white font-display">
            Education
          </h3>

          <div className="space-y-4">
            {PERSONAL_INFO.education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: idx * 0.15 }}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white font-display">
                    {edu.institution}
                  </h4>
                  <span className="text-xs font-mono text-cyan-400 font-medium">
                    {edu.period}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300">
                  {edu.degree}
                </div>
                <p className="text-xs text-slate-400">
                  {edu.highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          id="experience"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>Professional Experience</span>
          </div>

          <h3 className="text-2xl font-bold text-white font-display">
            Experience
          </h3>

          <div className="space-y-4">
            {PERSONAL_INFO.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-base font-bold text-white font-display">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono text-indigo-300">
                      {exp.company} · {exp.type}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                <div className="pt-2 border-t border-slate-800/60 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                  <span>Remote Collaboration</span>
                  <span>·</span>
                  <span>Documentation</span>
                  <span>·</span>
                  <span>Independent Task Execution</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
