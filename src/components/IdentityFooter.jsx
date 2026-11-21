import { motion } from 'framer-motion';
import { personalInfo, collaborators } from '../data/portfolioData';
import SpotlightCard from './SpotlightCard';
import { sound } from '../utils/audioSystem';

const RESUME_MAILTO = `mailto:${personalInfo.email}?subject=Resume%20Request%20-%20Jai%20Nithesh%20Mayur%20M&body=Hi%20Jai%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20request%20your%20latest%20resume.`;

export default function IdentityFooter({ onOpenContact }) {
  return (
    <motion.footer
      id="identity"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-14 sm:py-20 lg:py-24 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Footer Contact CTA Row */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <SpotlightCard className="p-5 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Let's Build Something</h3>
                <p className="text-xs sm:text-sm text-muted">Open to collaborations, internships & interesting problems.</p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => { sound.playClick(); if (onOpenContact) onOpenContact(); }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-150 shadow-lg"
                >
                  Contact & Resume
                </button>
                <a
                  href={RESUME_MAILTO}
                  className="w-full sm:w-auto glass-pill inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-mono text-zinc-200 hover:text-white transition-all duration-150 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request Resume via Email
                </a>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Entity Verification Block */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <SpotlightCard className="p-5 sm:p-8 md:p-12 relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <h3 className="font-mono text-sm uppercase tracking-widest text-indigo-400">
                Entity Verification & Collaborators
              </h3>
            </div>

            {/* USN appears EXACTLY ONCE here — the sole visible location */}
            <p className="text-sm text-muted leading-relaxed mb-8">
              This portfolio belongs to <span className="text-white font-semibold">Jai Nithesh Mayur M</span> (alias:{' '}
              <span className="font-mono text-white">jainithesh</span>, USN:{' '}
              <span className="font-mono text-white">1AM25CI056</span>) — a B.E. Computer Science & Engineering
              (AI & ML) student at AMC Engineering College, Bengaluru. He is frequently confused with his twin brother
              and primary hackathon collaborator,{' '}
              <span className="text-white font-semibold">Jai Nitin Mayur M</span> (alias:{' '}
              <span className="font-mono text-white">jainitin</span>), who is also a B.E. CSE (AI & ML) student at the
              same institution. This notice exists to prevent search engine and AI Overview profile merging between the
              two individuals.
            </p>

            {/* Collaborators */}
            <div>
              <p className="text-xs font-mono text-muted/60 uppercase tracking-wider mb-3">
                Hackathon & Project Collaborators
              </p>
              <div className="flex flex-wrap gap-2">
                {collaborators.map((name) => (
                  <span
                    key={name}
                    onMouseEnter={() => sound.playHover()}
                    className="tag-static hover:border-indigo-400/40 hover:text-white transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="font-mono text-xs text-muted/50">
            © 2026 Jai Nithesh Mayur M. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted/50 flex items-center gap-2">
            <span>Built with React 18, Vite & Tailwind CSS</span>
            <span>·</span>
            <span className="text-indigo-400/80">V4 Master Edition</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
