import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { Mail, Phone, Github, Linkedin, Twitter, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleOrCompany: '',
    projectType: 'Product Engineering',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const projectTypes = [
    'Product Engineering',
    'AI / Web App Build',
    'Internship / Role',
    'Casual Coffee Chat'
  ];

  const handleCopy = (text: string, type: string) => {
    sound.playBlip(750, 0.04);
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    sound.playBlip(600, 0.05);

    try {
      const response = await fetch(PERSONAL_INFO.contact.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          roleOrCompany: formData.roleOrCompany || 'N/A',
          projectType: formData.projectType,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        sound.playSuccess();
        try {
          confetti({
            particleCount: 60,
            spread: 55,
            origin: { y: 0.7 }
          });
        } catch {}
      } else {
        const data = await response.json();
        setErrorMessage(data.errors?.[0]?.message || 'Submission failed. Please email ndubuizuprosper09@gmail.com directly.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network connection error. Please email ndubuizuprosper09@gmail.com directly.');
      setStatus('error');
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 relative snap-start scroll-mt-24"
    >
      {/* Cinematic Scroll-Triggered Expanding Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent origin-left mb-8"
      />

      {/* Header with Scroll-Triggered Motion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800"
      >
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Get In Touch
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          Have an ambitious project, product build, or engineering role? Send a message directly to Prosper’s verified inbox.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact & Social Links with Motion */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white font-display">
              Let's build something people actually use.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Whether you want to build a new AI product from scratch, optimize a frontend architecture, or discuss software engineering opportunities, I’m always eager to collaborate.
            </p>
          </div>

          {/* Quick Copy Chips */}
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">Direct Email</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">{PERSONAL_INFO.contact.email}</span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.contact.email, 'email')}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                title="Copy Email Address"
                data-cursor
              >
                {copiedType === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">Telephone</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">{PERSONAL_INFO.contact.phone}</span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.contact.phone, 'phone')}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                title="Copy Phone Number"
                data-cursor
              >
                {copiedType === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="block text-xs font-mono uppercase text-slate-500 mb-3">
              Connect Across Platforms
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <a
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playBlip(500, 0.03)}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-600 hover:text-white transition-colors flex flex-col items-center justify-center gap-1.5 text-xs text-slate-300"
                data-cursor
                data-cursor-label="GITHUB"
              >
                <Github className="w-4 h-4" />
                <span className="font-mono text-[11px]">GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playBlip(550, 0.03)}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:text-blue-400 transition-colors flex flex-col items-center justify-center gap-1.5 text-xs text-slate-300"
                data-cursor
                data-cursor-label="LINKEDIN"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-mono text-[11px]">LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.contact.x}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playBlip(600, 0.03)}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:text-sky-400 transition-colors flex flex-col items-center justify-center gap-1.5 text-xs text-slate-300"
                data-cursor
                data-cursor-label="TWITTER"
              >
                <Twitter className="w-4 h-4" />
                <span className="font-mono text-[11px]">X (Twitter)</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Custom Formspree Form with Motion */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#090d19] to-[#060810] border border-cyan-500/25 shadow-2xl relative overflow-hidden">
            {/* Top Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500" />

            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white font-display">
                  Message Dispatched!
                </h4>
                <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for reaching out. Your transmission has been received in Prosper's inbox via Formspree. He will get back to you shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        email: '',
                        roleOrCompany: '',
                        projectType: 'Product Engineering',
                        message: ''
                      });
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h4 className="text-lg font-bold text-white font-display">
                    Send a Direct Note
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Connected to verified endpoint: <span className="font-mono text-cyan-400">formspree.io/f/mljdozll</span>
                  </p>
                </div>

                {/* Project Type Select Buttons */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    What are you looking to build or discuss?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          sound.playBlip(500, 0.03);
                          setFormData({ ...formData, projectType: type });
                        }}
                        className={`px-2.5 py-2 text-[11px] font-mono rounded-lg border text-center transition-all ${
                          formData.projectType === type
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-semibold'
                            : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900/80 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900/80 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-role" className="block text-xs font-medium text-slate-300 mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    id="contact-role"
                    type="text"
                    value={formData.roleOrCompany}
                    onChange={(e) => setFormData({ ...formData, roleOrCompany: e.target.value })}
                    placeholder="e.g. Acme Tech Studio / Recruiter"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900/80 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1">
                    Your Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your vision, product idea, questions, or timeline..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900/80 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 text-xs text-rose-300 bg-rose-950/40 border border-rose-900/60 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Protected with SSL & Formspree
                  </span>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-all shadow-lg shadow-cyan-400/20"
                    data-cursor
                    data-cursor-label="SEND"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
