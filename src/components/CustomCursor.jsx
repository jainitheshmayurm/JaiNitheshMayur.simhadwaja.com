import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor({ isOverrideActive }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Tightened spring physics — stiffness: 550, damping: 34
  const springConfig = { damping: 34, stiffness: 550, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkIsTouchOrMobile = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
      const isMobileWidth = window.innerWidth < 1024;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return isCoarse || isMobileWidth || prefersReduced;
    };

    if (checkIsTouchOrMobile()) {
      setIsTouchDevice(true);
      document.documentElement.classList.remove('cursor-none');
      document.body.classList.remove('cursor-none');
      return;
    } else {
      setIsTouchDevice(false);
      document.documentElement.classList.add('cursor-none');
      document.body.classList.add('cursor-none');
    }

    const handleResize = () => {
      if (checkIsTouchOrMobile()) {
        setIsTouchDevice(true);
        document.documentElement.classList.remove('cursor-none');
        document.body.classList.remove('cursor-none');
      } else {
        setIsTouchDevice(false);
        document.documentElement.classList.add('cursor-none');
        document.body.classList.add('cursor-none');
      }
    };

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverTarget = (e) => {
      const target = e.target;
      if (!target) return;
      const isClickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.clickable') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(!!isClickable);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', checkHoverTarget, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('cursor-none');
      document.body.classList.remove('cursor-none');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', checkHoverTarget);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const accentColor = isOverrideActive ? '#dc2626' : '#ffffff';
  const ringColor = isOverrideActive ? 'rgba(220, 38, 38, 0.65)' : 'rgba(255, 255, 255, 0.45)';

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Primary Dot — exact mouse position */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isClicking ? 5 : 8,
          height: isClicking ? 5 : 8,
          backgroundColor: '#ffffff',
          mixBlendMode: 'difference',
          boxShadow: isOverrideActive ? '0 0 10px #dc2626' : '0 0 8px rgba(255, 255, 255, 0.8)',
        }}
        transition={{ type: 'spring', damping: 34, stiffness: 550 }}
      />

      {/* Trailing Outer Ring — slightly offset from center to avoid covering link text */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {isHovering ? (
          // Bracket state: positioned to frame element perimeter
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1, rotate: isClicking ? 45 : 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="relative w-8 h-8 flex items-center justify-between px-1"
          >
            <div
              className="w-2 h-6 border-l-2 border-t-2 border-b-2 rounded-l-sm"
              style={{ borderColor: accentColor, filter: `drop-shadow(0 0 4px ${accentColor})` }}
            />
            <div
              className="w-2 h-6 border-r-2 border-t-2 border-b-2 rounded-r-sm"
              style={{ borderColor: accentColor, filter: `drop-shadow(0 0 4px ${accentColor})` }}
            />
          </motion.div>
        ) : (
          <motion.div
            animate={{ scale: isClicking ? 0.75 : 1, opacity: 0.55 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-7 h-7 rounded-full border"
            style={{
              borderColor: ringColor,
              boxShadow: isOverrideActive
                ? '0 0 12px rgba(220, 38, 38, 0.3)'
                : '0 0 12px rgba(255, 255, 255, 0.12)',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
