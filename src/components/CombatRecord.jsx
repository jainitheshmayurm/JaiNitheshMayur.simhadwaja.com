import { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { hackathons } from '../data/portfolioData';
import ScrambleText from './ScrambleText';
import SpotlightCard from './SpotlightCard';
import { sound } from '../utils/audioSystem';

export default function CombatRecord() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const sparkTop = useTransform(smoothProgress, (v) => `${Math.min(Math.max(v * 100, 0), 100)}%`);

  return (
    <motion.section
      id="hackathons"
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-14 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-16">
          <ScrambleText
            text="03 // COMBAT RECORD"
            as="h2"
            className="section-heading"
            duration={280}
          />
          <p className="section-subtitle">Hackathon Victories, CTF Showdowns & Competitive Programming</p>
          <div className="w-16 h-px bg-white/20" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Base Passive Track — left-aligned on mobile, centered on tablet/desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {/* Glowing Active Fiber-Optic Beam */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-600 origin-top shadow-[0_0_15px_#6366f1,0_0_30px_#06b6d4] z-10"
            style={{ scaleY: smoothProgress }}
          />

          {/* Glowing Leading Spark */}
          <motion.div
            className="absolute left-4 md:left-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white z-30 pointer-events-none"
            style={{
              top: sparkTop,
              boxShadow: '0 0 12px #ffffff, 0 0 24px #6366f1, 0 0 40px #06b6d4',
            }}
          />

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {hackathons.map((entry, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={entry.event}
                  className={`relative md:grid md:grid-cols-2 md:gap-10 lg:gap-16 ${
                    isEven ? '' : 'md:direction-rtl'
                  }`}
                >
                  {/* Glowing Node */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.4 }}
                    whileInView={{ scale: [0.8, 1.35, 1], opacity: 1 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center absolute left-4 md:left-1/2 top-8 w-5 h-5 rounded-full bg-obsidian border-2 border-indigo-400 -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse" />
                  </motion.div>

                  {/* Card — pl-10 on mobile so cards sit cleanly to the right of the left-4 spine */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    onMouseEnter={() => sound.playHover()}
                    className={`pl-10 md:pl-0 ${
                      isEven
                        ? 'md:col-start-1 md:col-end-2'
                        : 'md:col-start-2 md:col-end-3'
                    }`}
                  >
                    <SpotlightCard className="p-5 sm:p-6 lg:p-8 hover:border-indigo-500/40 transition-all">
                      {/* Badge & Date Row */}
                      <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" role="img" aria-label={entry.award}>
                            {entry.badge}
                          </span>
                          <span className="glass-pill inline-block px-2.5 sm:px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-indigo-400 border-indigo-500/30 bg-indigo-500/5">
                            {entry.award}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-muted/70">{entry.date}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-tight">
                        {entry.event}
                      </h3>

                      {entry.organizer && (
                        <p className="font-mono text-xs text-muted/80 mb-2.5 sm:mb-3">
                          {entry.organizer}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-muted leading-relaxed mb-3 sm:mb-4">
                        {entry.description}
                      </p>

                      {entry.tags && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-white/5">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="tag-static text-[11px] sm:text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </SpotlightCard>
                  </motion.div>

                  {/* Empty spacer column */}
                  <div className={isEven ? 'hidden md:block' : 'hidden md:block md:col-start-1 md:col-end-2 md:row-start-1'} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
