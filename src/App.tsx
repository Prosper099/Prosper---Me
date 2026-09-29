import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { CreativeCursor } from './components/cursor/CreativeCursor';
import { CosmicBackground } from './components/canvas/CosmicBackground';
import { Navbar } from './components/navigation/Navbar';
import { ScrollSpine } from './components/navigation/ScrollSpine';
import { Hero } from './components/sections/Hero';
import { FeaturedProjects } from './components/sections/FeaturedProjects';
import { AboutAndEducation } from './components/sections/AboutAndEducation';
import { SkillsSection } from './components/sections/SkillsSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectModal } from './components/modals/ProjectModal';
import { Footer } from './components/navigation/Footer';
import { Project } from './data/portfolio';

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Initialize Lenis Ultra-Smooth Inertial Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Framer Motion Scroll Progress & Parallax
  const { scrollYProgress } = useScroll();

  // Weighted parallax layers drifting gently in the background without affecting document flow
  const parallaxLayer1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const parallaxLayer2 = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Weighted smooth scroll progress indicator along the top edge
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070d] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Weighted Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500 z-50 origin-left shadow-[0_0_10px_rgba(34,211,238,0.5)] pointer-events-none"
        style={{ scaleX: progressScaleX }}
      />

      {/* Interactive Creative Reactive Cursor */}
      <CreativeCursor />

      {/* Interactive Floating Section Navigation Spine (Desktop) */}
      <ScrollSpine />

      {/* Cosmic Interactive Canvas Background */}
      <CosmicBackground />

      {/* Velocity-Driven Ambient Parallax Accent Blobs (Fixed & Isolated) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          style={{ y: parallaxLayer1 }}
          className="absolute top-[20%] -left-32 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px]"
        />
        <motion.div
          style={{ y: parallaxLayer2 }}
          className="absolute top-[60%] -right-32 w-[30rem] h-[30rem] rounded-full bg-indigo-500/5 blur-[140px]"
        />
      </div>

      {/* Top Bar Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Container with Smooth Stable Flow */}
      <div className="relative z-10">
        <main className="space-y-12 sm:space-y-20">
          <Hero onOpenContact={handleOpenContact} />
          <FeaturedProjects onSelectProject={(p) => setActiveProject(p)} />
          <AboutAndEducation />
          <SkillsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Project Case Study Deep-Dive Lightbox */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
