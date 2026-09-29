import React, { useEffect, useState, useRef } from 'react';

export const CreativeCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<{
    hovered: boolean;
    label: string | null;
    isClicking: boolean;
    isMagnetic: boolean;
  }>({
    hovered: false,
    label: null,
    isClicking: false,
    isMagnetic: false
  });
  const [isVisible, setIsVisible] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check element under cursor for cursor attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('[data-cursor], a, button, input, select, textarea');
        if (interactive) {
          const customLabel = interactive.getAttribute('data-cursor-label');
          const isMagnetic = interactive.hasAttribute('data-magnetic');
          setCursorState((prev) => ({
            ...prev,
            hovered: true,
            label: customLabel,
            isMagnetic
          }));
        } else {
          setCursorState((prev) => ({
            ...prev,
            hovered: false,
            label: null,
            isMagnetic: false
          }));
        }
      }
    };

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth spring physics loop for the trailing ring
    let currentX = -100;
    let currentY = -100;

    const render = () => {
      const ease = 0.18;
      currentX += (targetPos.current.x - currentX) * ease;
      currentY += (targetPos.current.y - currentY) * ease;
      setTrailingPos({ x: currentX, y: currentY });
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Core Dot */}
      <div
        className="absolute w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_8px_#22d3ee]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorState.isClicking ? 0.6 : 1})`
        }}
      />

      {/* Trailing Responsive Ring / Pill with Morphing Label */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ease-out border backdrop-blur-[1px] ${
          cursorState.label
            ? 'px-3 py-1.5 rounded-full bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
            : cursorState.hovered
            ? 'w-12 h-12 rounded-full bg-cyan-500/10 border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
            : 'w-8 h-8 rounded-full bg-transparent border-slate-500/50'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorState.isClicking ? 0.85 : 1})`
        }}
      >
        {cursorState.label && (
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase whitespace-nowrap">
            {cursorState.label}
          </span>
        )}
      </div>
    </div>
  );
};
