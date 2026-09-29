import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Menu, X as CloseIcon } from 'lucide-react';
import { sound } from '../../utils/audio';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070d]/85 backdrop-blur-md border-b border-slate-800/80 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={() => sound.playBlip(520, 0.05)}
          className="text-base sm:text-lg font-bold tracking-tight text-white font-display hover:text-cyan-400 transition-colors group flex items-center gap-2"
          data-cursor
          data-cursor-label="HOME"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
          <span>Prosper Ndubuizu</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.playBlip(480, 0.04)}
              className="hover:text-slate-100 transition-colors py-1 relative group"
              data-cursor
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            aria-label="Toggle subtle audio haptics"
            data-cursor
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              sound.playBlip(640, 0.06);
              onOpenContact();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-sm shadow-cyan-400/20 active:scale-95 whitespace-nowrap"
            data-cursor
            data-cursor-label="CONTACT"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => {
              sound.playBlip(440, 0.04);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/60 border border-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#070913] px-6 py-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                sound.playBlip(480, 0.04);
                setMobileMenuOpen(false);
              }}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-400 py-1.5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playBlip(640, 0.06);
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg transition-colors"
            >
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
