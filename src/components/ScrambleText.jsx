import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '../utils/cn';

const CHARS = '!<>-_\\/[]{}—=+*^?#________0123456789ABCDEF';

export default function ScrambleText({
  text,
  className = '',
  as: Component = 'span',
  duration = 280,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const hasAnimatedRef = useRef(false);

  // Respect prefers-reduced-motion
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // If reduced motion, just show text immediately
    if (prefersReduced) {
      setDisplayText(text);
      return;
    }

    setIsScrambling(true);

    const original = text;
    const length = original.length;
    const startTime = performance.now();
    const cappedDuration = Math.min(duration, 280); // hard cap at 280ms

    let frameId;

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / cappedDuration, 1);
      const resolvedCount = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (original[i] === ' ') {
          result += ' ';
        } else if (i < resolvedCount) {
          result += original[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setDisplayText(original);
        setIsScrambling(false);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isInView, text, duration, prefersReduced]);

  return (
    <Component
      ref={containerRef}
      className={cn(
        className,
        isScrambling && 'font-mono tabular-nums select-none'
      )}
    >
      {displayText}
    </Component>
  );
}
