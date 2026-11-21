import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audioSystem';

export default function SoloLevelingModal({ isOpen, onAccept, onDismiss }) {
  // Escape key dismisses
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onDismiss(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onDismiss]);

  if (!isOpen) return null;

  const handleAccept = () => {
    sound.playAwakening();
    onAccept();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}
        role="dialog"
        aria-modal="true"
        aria-label="Shadow Monarch Awakening Modal"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-lg w-full bg-[#030712] border-2 border-cyan-500/70 rounded-xl p-5 sm:p-8 shadow-[0_0_80px_rgba(6,182,212,0.35),inset_0_0_30px_rgba(6,182,212,0.1)] overflow-hidden font-mono"
        >
          {/* Top glowing banner */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Close button — top-right, high contrast */}
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg border border-white/20 text-zinc-200 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all text-sm font-bold"
            aria-label="Close modal"
          >
            ×
          </button>

          {/* System Alert Header */}
          <div className="flex items-center justify-between pb-4 border-b border-cyan-500/30 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-sm font-bold tracking-widest text-cyan-400 uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                [ SYSTEM ALERT ]
              </span>
            </div>
            <span className="text-[10px] text-cyan-500/60 uppercase tracking-widest">
              CLASS: SHADOW MONARCH
            </span>
          </div>

          {/* Quest Content */}
          <div className="space-y-4 text-center my-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl font-extrabold text-white tracking-wide"
            >
              [ The System has chosen you as a Player. ]
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-cyan-300/80 space-y-1.5 py-3 px-4 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-left"
            >
              <p className="text-cyan-400 font-semibold">{'>'} QUEST: "Courage of the Weak" Complete</p>
              <p className="text-zinc-300">{'>'} Qualification: Autonomous Active Defense & High-Intensity Problem Solving</p>
              <p className="text-indigo-300 font-mono">{'>'} Directive: Will you claim the Authority of the Ruler?</p>
            </motion.div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-cyan-500/30">
            <button
              onClick={handleAccept}
              onMouseEnter={() => sound.playHover()}
              className="relative px-8 py-3 rounded-lg font-bold text-sm tracking-widest uppercase text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95"
            >
              [ ACCEPT ]
            </button>
            {/* DECLINE — WCAG AA >= 6:1 contrast */}
            <button
              onClick={onDismiss}
              onMouseEnter={() => sound.playHover()}
              className="px-4 py-3 rounded-lg text-xs tracking-wider uppercase text-zinc-200 border border-white/25 hover:bg-white/10 hover:border-white/40 hover:text-white transition-colors"
            >
              DECLINE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
