import { motion } from 'framer-motion';
import { education, workstation, devTools } from '../data/portfolioData';
import ScrambleText from './ScrambleText';
import SpotlightCard from './SpotlightCard';
import { sound } from '../utils/audioSystem';

export default function Trajectory() {
  return (
    <motion.section
      id="trajectory"
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
            text="04 // TRAJECTORY & RIG"
            as="h2"
            className="section-heading"
            duration={280}
          />
          <p className="section-subtitle">Academic Path & Primary Development Environment</p>
          <div className="w-16 h-px bg-white/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Education Card — emphasized */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.25 }}
          >
            <SpotlightCard className="p-5 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="text-2xl">🎓</span>
                  <h3 className="font-mono text-sm uppercase tracking-widest text-indigo-400">
                    Academic Trajectory
                  </h3>
                </div>

                <div className="space-y-3.5 sm:space-y-4">
                  <div>
                    <p className="text-xs font-mono text-muted/60 uppercase tracking-wider mb-1">Degree</p>
                    <p className="text-sm text-white leading-relaxed font-semibold">{education.degree}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted/60 uppercase tracking-wider mb-1">Institution</p>
                    <p className="text-sm text-white">{education.institution}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted/60 uppercase tracking-wider mb-1">University Affiliation</p>
                    <p className="text-sm text-muted">{education.affiliation}</p>
                  </div>

                  {/* Key Academic Metrics — CGPA prominent */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-4 pt-2">
                    <div className="bg-indigo-500/10 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 border border-indigo-500/25">
                      <p className="text-[10px] font-mono text-indigo-400/80 uppercase tracking-wider mb-0.5">First-Year CGPA</p>
                      <p className="text-lg sm:text-xl font-mono text-white font-bold">{education.cgpa}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                      <p className="text-[10px] font-mono text-muted/60 uppercase tracking-wider mb-0.5">Batch</p>
                      <p className="text-xs sm:text-sm font-mono text-white">{education.batch}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                      <p className="text-[10px] font-mono text-muted/60 uppercase tracking-wider mb-0.5">Status</p>
                      <p className="text-xs sm:text-sm font-mono text-indigo-300">{education.semester}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-white/5">
                <p className="text-xs font-mono text-muted/60 uppercase tracking-wider mb-1">Pre-University</p>
                <p className="text-sm text-muted">{education.preUniversity}</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Workstation Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.25, delay: 0.05 }}
          >
            <SpotlightCard className="p-5 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                  <h3 className="font-mono text-sm uppercase tracking-widest text-indigo-400">
                    Hardware Rig Telemetry
                  </h3>
                </div>

                {/* Terminal-style readout — stacks cleanly on narrow mobile to prevent truncation */}
                <div className="bg-black/60 rounded-lg p-3 sm:p-4 font-mono text-xs space-y-2 mb-6 border border-white/5 shadow-inner">
                  {workstation.map((spec) => (
                    <div key={spec.key} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2 py-0.5 border-b border-white/[0.03] last:border-b-0">
                      <span className="text-indigo-400/80 uppercase text-[11px] font-semibold shrink-0">{spec.key}</span>
                      <span className="text-muted/90 break-words text-xs sm:text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dev Toolchain */}
              <div className="pt-2">
                <p className="text-xs font-mono text-muted/60 uppercase tracking-wider mb-2.5 sm:mb-3">Dev Toolchain</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {devTools.map((tool) => (
                    <span
                      key={tool}
                      onMouseEnter={() => sound.playHover()}
                      className="tag-static text-[11px] sm:text-xs hover:border-indigo-500/40 hover:text-white transition-colors cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
