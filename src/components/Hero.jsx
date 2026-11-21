import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, proofMetrics, socialLinks } from '../data/portfolioData';
import MagneticButton from './MagneticButton';
import SpotlightCard from './SpotlightCard';
import TiltContainer from './TiltContainer';
import { sound } from '../utils/audioSystem';

/* Inline Social Icons */
const SocialIcon = ({ type }) => {
  const icons = {
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    facebook: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    github: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    x: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  };
  return icons[type] || null;
};

const FallbackSilhouette = () => (
  <div className="w-full h-full min-h-[220px] lg:min-h-[380px] flex items-center justify-center rounded-2xl bg-surface/50 border border-white/5">
    <svg className="w-32 h-32 lg:w-48 lg:h-48 text-muted/20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  </div>
);

export default function Hero({ onOpenContact }) {
  const [imgError, setImgError] = useState(false);

  const scrollToMissions = (e) => {
    e.preventDefault();
    sound.playClick();
    const el = document.querySelector('#missions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] pt-20 pb-8 lg:pt-24 lg:pb-10 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Portrait Column — rendered first on mobile (<1024px) above text card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 lg:col-span-5 w-full flex justify-center items-center"
          >
            <TiltContainer maxTilt={5} perspective={1000} className="relative w-full flex justify-center">
              <div className="relative w-44 sm:w-56 lg:w-auto mx-auto flex justify-center">
                {!imgError ? (
                  <img
                    src="/TRNSBGME.png"
                    alt="Jai Nithesh Mayur M — AI/ML Engineer, Bengaluru"
                    className="animate-float rounded-2xl object-contain max-h-[240px] sm:max-h-[300px] lg:max-h-[68vh] w-auto transition-transform duration-700 hover:scale-[1.02] mx-auto select-none pointer-events-auto"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
                    }}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <FallbackSilhouette />
                )}
              </div>
            </TiltContainer>
          </motion.div>

          {/* Left Column — Bio Card & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 lg:col-span-7 w-full space-y-3 lg:space-y-3.5"
          >
            <TiltContainer maxTilt={4} perspective={1200}>
              <SpotlightCard className="p-5 sm:p-6 lg:p-7 relative">
                <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                  <span className="glass-pill inline-block px-3 py-1 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-300">
                    BENGALURU · B.E. CSE (AI & ML)
                  </span>
                </div>

                {/* Name — high-contrast gradient, M never fades */}
                <h1 className="mt-2.5 sm:mt-3 leading-[1.08]">
                  <span className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
                    JAI
                  </span>
                  <span
                    className="block text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent leading-[1.08]"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #ffffff, #f4f4f5, #d4d4d8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Nithesh Mayur M
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-2 text-sm sm:text-base lg:text-lg font-medium text-white/90 leading-snug">
                  {personalInfo.title}
                </p>
                <p className="mt-0.5 text-xs sm:text-sm font-mono text-zinc-400">
                  {personalInfo.subtitle}
                </p>

                {/* Bio */}
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                  {personalInfo.bio}
                </p>

                {/* Proof-of-Work Telemetry Strip — 2x2 grid on mobile, 4-col on tablet/desktop */}
                <div className="mt-3 lg:mt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {proofMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="bg-white/[0.04] border border-white/[0.09] rounded-lg py-2 px-3 flex flex-col items-center justify-center text-center"
                    >
                      <span className="font-mono text-xs font-bold text-white">{m.label}</span>
                      <span className="font-mono text-[10px] text-zinc-400 mt-0.5">{m.sub}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Pair */}
                <div className="mt-3.5 lg:mt-4 flex flex-wrap gap-2.5">
                  <button
                    onClick={scrollToMissions}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-150 shadow-lg hover:shadow-white/20"
                  >
                    Explore Missions ↓
                  </button>
                  <button
                    onClick={() => { sound.playClick(); if (onOpenContact) onOpenContact(); }}
                    className="w-full sm:w-auto glass-pill inline-flex items-center justify-center gap-2 py-2.5 px-5 text-sm font-semibold text-white border-white/25 hover:border-white/50 transition-all duration-150"
                  >
                    Contact & Resume
                  </button>
                </div>
              </SpotlightCard>
            </TiltContainer>

            {/* Social Action Row — immediately visible above fold on 1280x720 and 1440x900 */}
            <div className="mt-3.5 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="glass-pill flex items-center justify-center gap-2 px-3.5 py-2 text-muted hover:text-white text-xs sm:text-sm font-mono shadow-sm transition-all duration-150 ease-out hover:-translate-y-0.5 min-h-[44px]"
                >
                  <SocialIcon type={link.icon} />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
