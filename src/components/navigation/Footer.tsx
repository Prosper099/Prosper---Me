import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { sound } from '../../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playBlip(680, 0.04);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#04060b] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
        {/* Left: Brand and Copyright */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-white font-bold text-sm font-display tracking-tight">
            Prosper Ndubuizu
          </div>
          <p className="text-slate-500 font-mono text-[11px]">
            Designed & Engineered with care. Turning ideas into real products.
          </p>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <a
            href={PERSONAL_INFO.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.contact.x}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            X (Twitter)
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.contact.email}`}
            className="hover:text-cyan-400 transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors font-mono text-[11px]"
          title="Return to top of page"
          data-cursor
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
