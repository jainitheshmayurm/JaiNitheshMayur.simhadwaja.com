import { useState, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const motionX = useMotionValue(-100);
  const motionY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      motionX.set(e.clientX);
      motionY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [motionX, motionY]);

  return { ...position, motionX, motionY };
}
