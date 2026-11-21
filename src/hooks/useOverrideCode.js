import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const ZION_CODE = ['z', 'i', 'o', 'n'];
const ARISE_CODE = ['a', 'r', 'i', 's', 'e'];

export default function useOverrideCode() {
  const [isShattering, setIsShattering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverrideActive, setIsOverrideActive] = useState(false);

  const [konamiIndex, setKonamiIndex] = useState(0);
  const [zionIndex, setZionIndex] = useState(0);
  const [ariseIndex, setAriseIndex] = useState(0);

  // Initiates the theatrical sequence
  const startAwakeningSequence = useCallback(() => {
    // 0.5s pause before shattering
    setTimeout(() => {
      setIsShattering(true);
    }, 500);
  }, []);

  const handleShatterComplete = useCallback(() => {
    setIsShattering(false);
    setIsModalOpen(true);
  }, []);

  const acceptAwakening = useCallback(() => {
    setIsModalOpen(false);
    setIsOverrideActive(true);
    document.body.classList.add('override-active', 'scanlines');
  }, []);

  const dismissModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const deactivateOverride = useCallback(() => {
    setIsOverrideActive(false);
    setIsModalOpen(false);
    setIsShattering(false);
    document.body.classList.remove('override-active', 'scanlines');
    setKonamiIndex(0);
    setZionIndex(0);
    setAriseIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in terminal or an input field
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key;

      // 1. Konami Code
      if (key === KONAMI_CODE[konamiIndex]) {
        const next = konamiIndex + 1;
        if (next === KONAMI_CODE.length) {
          startAwakeningSequence();
          setKonamiIndex(0);
        } else {
          setKonamiIndex(next);
        }
      } else {
        setKonamiIndex(key === KONAMI_CODE[0] ? 1 : 0);
      }

      // 2. ZION Code
      const lowerKey = key.toLowerCase();
      if (lowerKey === ZION_CODE[zionIndex]) {
        const next = zionIndex + 1;
        if (next === ZION_CODE.length) {
          startAwakeningSequence();
          setZionIndex(0);
        } else {
          setZionIndex(next);
        }
      } else {
        setZionIndex(lowerKey === ZION_CODE[0] ? 1 : 0);
      }

      // 3. ARISE Code (Solo Leveling iconic prompt)
      if (lowerKey === ARISE_CODE[ariseIndex]) {
        const next = ariseIndex + 1;
        if (next === ARISE_CODE.length) {
          startAwakeningSequence();
          setAriseIndex(0);
        } else {
          setAriseIndex(next);
        }
      } else {
        setAriseIndex(lowerKey === ARISE_CODE[0] ? 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, zionIndex, ariseIndex, startAwakeningSequence]);

  return {
    isShattering,
    isModalOpen,
    isOverrideActive,
    handleShatterComplete,
    acceptAwakening,
    dismissModal,
    deactivateOverride,
    triggerManual: startAwakeningSequence,
  };
}
