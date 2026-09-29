import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

export const ScrollSpine: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: '00', name: 'Intro' },
    { id: 'projects', label: '01', name: 'Works' },
    { id: 'about', label: '02', name: 'Origins' },
    { id: 'skills', label: '03', name: 'Craft' },
    { id: 'contact', label: '04', name: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playBlip(580, 0.04);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.8 }}
      className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-4 pointer-events-auto"
      aria-label="Section navigation tracker"
    >
      <div className="flex flex-col gap-3 font-mono text-[10px]">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group flex items-center gap-2.5 transition-all text-left"
              data-cursor
            >
              {/* Indicator dot & bar */}
              <div className="relative flex items-center justify-center">
                <span
                  className={`block transition-all duration-500 rounded-full ${
                    isActive
                      ? 'w-2 h-6 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]'
                      : 'w-1.5 h-1.5 bg-slate-700 group-hover:bg-slate-500'
                  }`}
                />
              </div>

              {/* Text label */}
              <div
                className={`transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-300 font-bold opacity-100 translate-x-0.5'
                    : 'text-slate-600 group-hover:text-slate-400 opacity-60'
                }`}
              >
                <span>{sec.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] uppercase tracking-wider text-slate-400">
                  {sec.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
};
