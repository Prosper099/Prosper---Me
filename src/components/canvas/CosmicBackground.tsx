import React, { useEffect, useRef } from 'react';

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(65, Math.floor(window.innerWidth / 22));
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 1 + Math.random() * 1.6,
        baseAlpha: 0.15 + Math.random() * 0.35
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.08;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity
      scrollVelocity *= 0.92;

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy + scrollVelocity;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interaction with mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        let alpha = p.baseAlpha;

        if (distToMouse < 140) {
          alpha = Math.min(0.8, p.baseAlpha + (1 - distToMouse / 140) * 0.5);
          // Faint connection line to mouse
          ctx.beginPath();
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - distToMouse / 140) * 0.25})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`;
        ctx.fill();

        // Connect nearby particles with subtle hair lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(148, 163, 184, ${(1 - dist / 110) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Atmospheric Gradient Glows */}
      <div className="absolute -top-[20%] left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-950/20 blur-[130px] animate-pulse-glow" />
      <div className="absolute top-[45%] -right-[10%] w-[700px] h-[700px] rounded-full bg-indigo-950/25 blur-[150px]" />
      <div className="absolute bottom-[10%] -left-[10%] w-[650px] h-[650px] rounded-full bg-blue-950/20 blur-[140px]" />

      {/* Subtle Grid Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
