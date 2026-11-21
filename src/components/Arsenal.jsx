import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';
import ScrambleText from './ScrambleText';
import SpotlightCard from './SpotlightCard';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { sound } from '../utils/audioSystem';

function TerminalShell({ category, onClose }) {
  const { text: typedLine } = useTypingEffect(category.commands || [], {
    minSpeed: 30,
    maxSpeed: 80,
    pauseDuration: 1300,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="min-h-[140px] h-auto flex flex-col justify-between bg-black/90 rounded-lg p-3 sm:p-3.5 border border-green-500/40 font-mono text-xs shadow-[inset_0_0_20px_rgba(34,197,94,0.12)]"
    >
      <div className="flex items-center justify-between pb-2 border-b border-green-500/20 text-green-500/70 text-[10px] gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping shrink-0" />
          <span className="font-bold tracking-wider truncate">EXEC_SHELL // {category.title.toUpperCase()}</span>
        </div>
        <button
          onClick={onClose}
          className="text-[10px] text-green-400/60 hover:text-green-300 hover:bg-green-500/10 px-1.5 py-0.5 rounded transition-all shrink-0"
          aria-label="Close shell"
        >
          [× CLOSE]
        </button>
      </div>

      <div className="space-y-1.5 py-2 text-green-400">
        <p className="leading-tight text-white/90 break-words whitespace-pre-wrap">
          {typedLine}
          <span className="inline-block text-green-400 ml-0.5 animate-pulse font-bold">█</span>
        </p>
        <p className="text-[10px] text-green-500/50 break-words">status: kernel isolated // telemetry streaming</p>
      </div>

      <div className="text-[9px] text-green-500/40 text-right">
        [ESC OR CLICK × TO CLOSE]
      </div>
    </motion.div>
  );
}

export default function Arsenal() {
  const [activeShell, setActiveShell] = useState(null);

  // Escape key closes active shell
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setActiveShell(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <motion.section
      id="arsenal"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-14 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <ScrambleText
            text="01 // THE ARSENAL"
            as="h2"
            className="section-heading"
            duration={280}
          />
          <p className="section-subtitle">Core Engineering Stack & Security Toolchains</p>
          <div className="w-16 h-px bg-white/20" />
        </div>

        {/* Responsive Grid — 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories.map((category, idx) => {
            const isShellOpen = activeShell === category.id;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
              >
                <SpotlightCard className="p-5 sm:p-6 transition-all duration-300 min-h-[220px] flex flex-col justify-between">
                  <div>
                    {/* Card Header — title + [>_ RUN] button, no collision */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <h3 className="font-mono text-sm uppercase tracking-widest text-indigo-400 leading-tight">
                        {category.title}
                      </h3>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setActiveShell(isShellOpen ? null : category.id);
                        }}
                        className="shrink-0 font-mono text-[10px] sm:text-xs text-zinc-300 border border-white/15 rounded px-2.5 py-1 min-h-[28px] hover:border-emerald-400/50 hover:text-emerald-300 hover:bg-emerald-500/5 transition-all whitespace-nowrap"
                        aria-label={isShellOpen ? 'Close shell' : 'Run shell'}
                      >
                        {isShellOpen ? '[× SHELL]' : '[>_ RUN]'}
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {isShellOpen ? (
                        <TerminalShell
                          key="shell"
                          category={category}
                          onClose={() => setActiveShell(null)}
                        />
                      ) : (
                        <motion.div
                          key="tags"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-wrap gap-2"
                        >
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className="tag-static"
                            >
                              {skill}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="text-indigo-400/60">{category.skills.length} TOOLS</span>
                    <span className={isShellOpen ? 'text-emerald-400' : 'text-zinc-500'}>
                      {isShellOpen ? '● EXECUTING' : '○ READY'}
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
