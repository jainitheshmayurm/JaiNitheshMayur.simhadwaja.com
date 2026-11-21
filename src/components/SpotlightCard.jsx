import { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { cn } from '../utils/cn';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.08)',
  spotlightSize = 400,
  ...props
}) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-500);
    mouseY.set(-500);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative glass-card overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor-Tracking Radial Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      {/* Subtle Border Spotlight Reflection */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.18)',
          maskImage: useMotionTemplate`radial-gradient(${spotlightSize * 0.75}px circle at ${mouseX}px ${mouseY}px, black 30%, transparent 65%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(${spotlightSize * 0.75}px circle at ${mouseX}px ${mouseY}px, black 30%, transparent 65%)`,
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
