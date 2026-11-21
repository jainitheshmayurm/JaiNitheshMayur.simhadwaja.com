import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import ScrambleText from './ScrambleText';
import SpotlightCard from './SpotlightCard';
import { sound } from '../utils/audioSystem';

const FILTER_TABS = [
  { label: 'ALL', value: 'ALL' },
  { label: 'AI & ML', value: 'AI & ML' },
  { label: 'CYBERSECURITY', value: 'CYBERSECURITY' },
  { label: 'FULL-STACK', value: 'FULL-STACK' },
  { label: 'ROBOTICS & GAME DEV', value: 'ROBOTICS & GAME DEV' },
];

function getGridClass(index, filtered, total) {
  if (filtered !== 'ALL') {
    return 'col-span-1 sm:col-span-1 lg:col-span-3';
  }
  const bentoMap = [
    'col-span-1 sm:col-span-2 lg:col-span-4', // 0 HackZion
    'col-span-1 sm:col-span-1 lg:col-span-2', // 1 SENTINEL
    'col-span-1 sm:col-span-1 lg:col-span-2', // 2 SMART HERS
    'col-span-1 sm:col-span-2 lg:col-span-4', // 3 Gen-Blaze
    'col-span-1 sm:col-span-1 lg:col-span-3', // 4 Smart Health Link
    'col-span-1 sm:col-span-1 lg:col-span-3', // 5 Video Pipeline
    'col-span-1 sm:col-span-2 lg:col-span-6', // 6 Star Wars (featured)
  ];
  return bentoMap[index] || 'col-span-1 sm:col-span-1 lg:col-span-3';
}

export default function MissionLogs({ onOpenDrawer }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <motion.section
      id="missions"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-14 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <ScrambleText
            text="02 // MISSION LOGS"
            as="h2"
            className="section-heading"
            duration={280}
          />
          <p className="section-subtitle">Featured Systems, Active Defense & Autonomous Hardware</p>
          <div className="w-16 h-px bg-white/20" />
        </div>

        {/* Category Filter Bar — horizontally scrollable with hidden scrollbar on narrow screens */}
        <div className="flex overflow-x-auto no-scrollbar pb-2 sm:pb-0 sm:flex-wrap gap-2 mb-8 relative max-w-full -mx-4 px-4 sm:mx-0 sm:px-0">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value;
            const count = tab.value === 'ALL' ? projects.length : projects.filter(p => p.category === tab.value).length;
            return (
              <button
                key={tab.value}
                onClick={() => { sound.playClick(); setActiveFilter(tab.value); }}
                className={`shrink-0 whitespace-nowrap min-h-[40px] relative font-mono text-xs tracking-widest px-3.5 sm:px-4 py-2 rounded-full transition-all duration-200 border ${
                  isActive
                    ? 'bg-white text-black border-white font-semibold'
                    : 'border-white/15 text-zinc-400 hover:text-white hover:border-white/30 bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="mission-filter"
                    className="absolute inset-0 bg-white rounded-full"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label} {tab.value === 'ALL' ? `(${count})` : count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>

        {/* Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 items-stretch"
            layout
          >
            {filtered.map((project, idx) => (
              <motion.div
                key={project.codename}
                layout
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className={getGridClass(idx, activeFilter, filtered.length)}
              >
                <SpotlightCard className="p-5 sm:p-6 flex flex-col h-full group relative overflow-hidden">
                  {/* Subtle border-beam glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{
                      background: 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03), transparent 70%)',
                    }}
                  />

                  {/* Header */}
                  <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                        {project.codename}
                      </h3>
                      {project.subtitle && (
                        <p className="font-mono text-xs text-indigo-400 mt-1 font-medium">
                          {project.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="tag-static whitespace-nowrap text-[10px] sm:text-xs">{project.date}</span>
                      <span className="tag-static whitespace-nowrap text-[10px] sm:text-xs text-indigo-300/70">{project.category}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 text-xs sm:text-sm text-muted leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="relative z-10 flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="tag-static text-[11px] sm:text-xs">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons — full tap targets */}
                  <div className="relative z-10 flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => { sound.playClick(); if (onOpenDrawer) onOpenDrawer(project); }}
                      className="btn-interactive inline-flex items-center justify-center gap-2 min-h-[40px] px-3.5 py-2 text-xs sm:text-sm flex-1 sm:flex-initial"
                    >
                      <span>Inspect Architecture</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="btn-interactive inline-flex items-center justify-center gap-2 min-h-[40px] px-3.5 py-2 text-xs sm:text-sm"
                    >
                      <span>GitHub ↗</span>
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
