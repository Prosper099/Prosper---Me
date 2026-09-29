import React, { useEffect } from 'react';
import { Project } from '../../data/portfolio';
import { ExternalLink, Github, Check, X as CloseIcon, Cpu, Layers } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#090d18] border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Top Bar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060913]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
              {project.category}
            </span>
            <h2 id="modal-project-title" className="text-lg font-bold text-white font-display">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playBlip(600, 0.05)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              <span>Visit Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                sound.playBlip(440, 0.04);
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 no-scrollbar">
          {/* Large Project Image Preview */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description & Overview */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider font-mono text-cyan-400">
              {project.tagline}
            </span>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights & Features */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Key System Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Tech Stack */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Technologies & Architecture
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#060913]">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playBlip(500, 0.04)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playBlip(440, 0.04);
                onClose();
              }}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Close
            </button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playBlip(600, 0.05)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              <span>Launch Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
