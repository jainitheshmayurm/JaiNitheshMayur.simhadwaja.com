import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/portfolioData';
import { sound } from '../utils/audioSystem';

export default function Navbar({ onToggleTerminal, soundMuted, onToggleSound, onOpenCommandPalette, onOpenContact, motionEnabled, onToggleMotion }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver scroll-spy
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`#${id}`);
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    sound.playClick();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-2xl bg-obsidian/90 border-b border-white/10 shadow-lg shadow-black/20'
            : 'backdrop-blur-xl bg-obsidian/60 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Brand */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              onMouseEnter={() => sound.playHover()}
              className="font-mono text-sm font-bold text-white tracking-tight hover:text-zinc-200 transition-colors shrink-0"
            >
              JNM.
            </a>

            {/* Center: Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    onMouseEnter={() => sound.playHover()}
                    aria-current={isActive ? 'true' : undefined}
                    className="relative font-mono text-xs tracking-widest px-3 py-2 rounded-lg transition-all"
                    style={{ color: isActive ? '#ffffff' : 'rgba(161,161,170,0.8)' }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-white/8 rounded-lg"
                        style={{ zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Right Controls — Desktop */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              {/* ⌘K Command Palette */}
              <button
                onClick={() => { sound.playClick(); if (onOpenCommandPalette) onOpenCommandPalette(); }}
                onMouseEnter={() => sound.playHover()}
                className="glass-pill px-3 py-1.5 font-mono text-[11px] tracking-wider text-zinc-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-1.5"
                title="Open Command Palette (Ctrl+K)"
                aria-label="Open Command Palette"
              >
                <span className="text-zinc-400">⌘</span>
                <span>K</span>
              </button>

              {/* Contact */}
              <button
                onClick={() => { sound.playClick(); if (onOpenContact) onOpenContact(); }}
                onMouseEnter={() => sound.playHover()}
                className="glass-pill px-3 py-1.5 font-mono text-[11px] tracking-wider text-zinc-300 hover:text-white hover:border-white/30 transition-all"
                aria-label="Open Contact & Resume Drawer"
              >
                CONTACT
              </button>

              {/* CLI Terminal */}
              <button
                onClick={() => { sound.playClick(); if (onToggleTerminal) onToggleTerminal(); }}
                onMouseEnter={() => sound.playHover()}
                className="glass-pill px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider text-zinc-200 hover:border-emerald-400/50 hover:text-emerald-300 transition-all flex items-center gap-1.5 border-white/15"
                title="Launch Retro CLI Terminal Mode"
              >
                <span>{'>_'}</span>
                <span>TERMINAL</span>
                <span className="text-emerald-400 cursor-blink ml-0.5">_</span>
              </button>

              {/* Sound Toggle */}
              <div className="relative group">
                <button
                  onClick={() => { if (onToggleSound) onToggleSound(); }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-2 rounded-lg border transition-all ${
                    !soundMuted
                      ? 'border-indigo-400/50 bg-indigo-500/10 text-indigo-400'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                  aria-label="Toggle UI Sound"
                >
                  {!soundMuted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  )}
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/90 text-zinc-200 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {soundMuted ? 'Sound: Muted' : 'Sound: Active'}
                </span>
              </div>

              {/* Motion Toggle */}
              <div className="relative group">
                <button
                  onClick={() => { if (onToggleMotion) onToggleMotion(); }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-2 rounded-lg border transition-all ${
                    motionEnabled
                      ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-400'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                  aria-label="Toggle Background Motion"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/90 text-zinc-200 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {motionEnabled ? 'Motion: On' : 'Motion: Off'}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                <span className="font-mono text-[10px] tracking-wider text-zinc-400">
                  ONLINE
                </span>
              </div>
            </div>

            {/* Mobile Controls — ultra-clean, all >= 40px tap targets */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              <button
                onClick={() => { sound.playClick(); if (onOpenCommandPalette) onOpenCommandPalette(); }}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-200 hover:text-white font-mono text-xs font-semibold"
                aria-label="Open Command Palette"
                title="⌘K Search"
              >
                ⌘K
              </button>
              <button
                onClick={() => { sound.playClick(); if (onToggleTerminal) onToggleTerminal(); }}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-200 hover:text-emerald-300 font-mono text-xs font-bold"
                aria-label="Launch Terminal Mode"
                title="Terminal Mode"
              >
                {'>_'}
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-300 hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden backdrop-blur-2xl bg-obsidian/95 border-b border-white/10 px-4 pt-2 pb-6 max-h-[calc(100dvh-4rem)] overflow-y-auto"
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center w-full min-h-[44px] px-3 font-mono text-xs tracking-widest rounded-lg border-b border-white/5 last:border-b-0 transition-colors ${
                      activeSection === link.href ? 'text-white bg-white/8 font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="pt-4 mt-2 border-t border-white/10 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { sound.playClick(); if (onOpenContact) onOpenContact(); setIsMobileOpen(false); }}
                    className="glass-pill flex items-center justify-center min-h-[44px] px-3 py-2 font-mono text-xs text-zinc-200 hover:text-white border-white/20"
                  >
                    CONTACT & RESUME
                  </button>
                  <button
                    onClick={() => { sound.playClick(); if (onToggleTerminal) onToggleTerminal(); setIsMobileOpen(false); }}
                    className="glass-pill flex items-center justify-center min-h-[44px] px-3 py-2 font-mono text-xs text-zinc-200 hover:text-emerald-300 border-white/20"
                  >
                    {'>_'} TERMINAL
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    {/* Sound Toggle */}
                    <button
                      onClick={() => { if (onToggleSound) onToggleSound(); }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 min-h-[40px] rounded-lg border text-xs font-mono transition-all ${
                        !soundMuted
                          ? 'border-indigo-400/50 bg-indigo-500/10 text-indigo-400'
                          : 'border-white/10 bg-white/5 text-zinc-400'
                      }`}
                      aria-label="Toggle sound"
                    >
                      {!soundMuted ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
                          </svg>
                          <span>SFX: ON</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                          <span>SFX: OFF</span>
                        </>
                      )}
                    </button>

                    {/* Motion Toggle */}
                    <button
                      onClick={() => { if (onToggleMotion) onToggleMotion(); }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 min-h-[40px] rounded-lg border text-xs font-mono transition-all ${
                        motionEnabled
                          ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-400'
                          : 'border-white/10 bg-white/5 text-zinc-400'
                      }`}
                      aria-label="Toggle motion"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{motionEnabled ? 'MOTION: ON' : 'MOTION: OFF'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pl-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                    <span className="font-mono text-[10px] tracking-wider text-zinc-400">ONLINE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom dissolve fade */}
        <div className="pointer-events-none absolute left-0 right-0 top-full h-6 bg-gradient-to-b from-obsidian/80 to-transparent" />
      </nav>
    </>
  );
}
