import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audioSystem';

export default function OverrideHUD({ onRTH, onExit }) {
  // Escape key exits Shadow Monarch Mode
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onExit();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onExit]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-5 sm:bottom-5 z-50 font-mono overflow-hidden"
      style={{
        background: 'rgba(8, 0, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(220, 38, 38, 0.5)',
        borderRadius: '0.75rem',
        boxShadow: '0 0 40px rgba(220, 38, 38, 0.2), 0 0 20px rgba(124, 58, 237, 0.15)',
      }}
    >
      {/* Compact slim single-row bar on mobile, full detail on desktop */}
      <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 whitespace-nowrap text-[10px]">
        {/* Status indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold">
            SHADOW MONARCH
          </span>
        </div>

        {/* Player info — shown on desktop */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-white/20">|</span>
          <span className="text-[10px] text-white font-bold">
            JAI NITHESH MAYUR M
          </span>
        </div>

        {/* Action Buttons — WCAG AA >= 6:1 contrast */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto sm:ml-0">
          <span className="hidden sm:inline text-white/20">|</span>
          <button
            onClick={() => { sound.playClick(); onRTH(); }}
            className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded border border-white/25 text-zinc-100 hover:bg-white/10 hover:border-white/50 transition-all min-h-[30px]"
            aria-label="Return to top"
          >
            [RTH]
          </button>
          <button
            onClick={() => { sound.playClick(); onExit(); }}
            className="text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded border border-red-400/60 text-red-200 hover:bg-red-500/15 hover:border-red-400 transition-all shadow-[0_0_8px_rgba(220,38,38,0.3)] min-h-[30px]"
            aria-label="Exit Shadow Monarch Mode (also press Esc)"
          >
            [EXIT] ESC
          </button>
        </div>
      </div>
    </motion.div>
  );
}
