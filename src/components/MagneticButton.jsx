import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { sound } from '../utils/audioSystem';

export default function MagneticButton({
  children,
  className = '',
  pullDistance = 40,
  pullStrength = 0.35,
  onClick,
  href = '#',
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 220, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.hypot(dx, dy);

    if (dist < rect.width / 2 + pullDistance) {
      x.set(dx * pullStrength);
      y.set(dy * pullStrength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleClick = (e) => {
    sound.playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`inline-block select-none ${className}`}
    >
      {children}
    </motion.a>
  );
}
