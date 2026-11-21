import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, personalInfo } from '../data/portfolioData';
import { sound } from '../utils/audioSystem';

const RESUME_MAILTO = `mailto:${personalInfo.email}?subject=Resume%20Request%20-%20Jai%20Nithesh%20Mayur%20M&body=Hi%20Jai%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20request%20your%20latest%20resume.`;

function buildCommands({ onScrollTo, onOpenProject, onOpenContact, onOpenTerminal, onToggleSound, onToggleMotion }) {
  return [
    // Navigate
    { group: 'Navigate', label: 'Go to Origin', icon: '⬆', action: () => onScrollTo('#hero') },
    { group: 'Navigate', label: 'Go to The Arsenal', icon: '🛡', action: () => onScrollTo('#arsenal') },
    { group: 'Navigate', label: 'Go to Mission Logs', icon: '📋', action: () => onScrollTo('#missions') },
    { group: 'Navigate', label: 'Go to Combat Record', icon: '⚔️', action: () => onScrollTo('#hackathons') },
    { group: 'Navigate', label: 'Go to Trajectory', icon: '🎓', action: () => onScrollTo('#trajectory') },
    { group: 'Navigate', label: 'Go to Entity Verification', icon: '🔍', action: () => onScrollTo('#identity') },
    // Projects
    ...projects.map((p) => ({
      group: 'Inspect Projects',
      label: `Inspect: ${p.codename}`,
      icon: '🔬',
      action: () => onOpenProject(p),
    })),
    // Actions
    { group: 'Actions', label: 'Copy Email Address', icon: '📋', action: () => {
      navigator.clipboard?.writeText(personalInfo.email).catch(() => {});
      sound.playConfirm?.();
    }},
    { group: 'Actions', label: 'Open Contact & Resume Drawer', icon: '✉️', action: () => onOpenContact() },
    { group: 'Actions', label: 'Download Resume (PDF)', icon: '📄', action: () => {
      const a = document.createElement('a');
      a.href = '/resume.pdf';
      a.download = 'Jai_Nithesh_Mayur_M_Resume.pdf';
      a.click();
    }},
    { group: 'Actions', label: 'Request Resume via Email', icon: '📧', action: () => window.open(RESUME_MAILTO, '_blank') },
    { group: 'Actions', label: 'Open LinkedIn', icon: '🔗', action: () => window.open('https://www.linkedin.com/in/jainitheshmayurm/', '_blank') },
    { group: 'Actions', label: 'Open GitHub', icon: '🐙', action: () => window.open('https://github.com/jainitheshmayurm', '_blank') },
    { group: 'Actions', label: 'Open X (Twitter)', icon: '🐦', action: () => window.open('https://x.com/jainitheshmayur', '_blank') },
    { group: 'Actions', label: 'Open Facebook', icon: '👤', action: () => window.open('https://www.facebook.com/jainitheshmayur/', '_blank') },
    // System
    { group: 'System', label: 'Launch >_ Terminal Mode', icon: '💻', action: () => onOpenTerminal() },
    { group: 'System', label: 'Toggle UI Sound', icon: '🔊', action: () => onToggleSound() },
    { group: 'System', label: 'Toggle Background Motion', icon: '⚡', action: () => onToggleMotion() },
    { group: 'System', label: '[???] Protocol Hint', icon: '🌑', action: () => {} },
  ];
}

export default function CommandPalette({ isOpen, onClose, onScrollTo, onOpenProject, onOpenContact, onOpenTerminal, onToggleSound, onToggleMotion }) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [copyToast, setCopyToast] = useState(false);

  const commands = buildCommands({ onScrollTo, onOpenProject, onOpenContact, onOpenTerminal, onToggleSound, onToggleMotion });

  const filtered = query.trim()
    ? commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.group.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIdx]) {
          runCommand(filtered[selectedIdx]);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, filtered, selectedIdx]);

  // Reset selection on query change
  useEffect(() => { setSelectedIdx(0); }, [query]);

  // Scroll selected into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.children[selectedIdx];
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIdx]);

  const runCommand = (cmd) => {
    sound.playClick();
    if (cmd.label === 'Copy Email Address') {
      navigator.clipboard?.writeText(personalInfo.email).catch(() => {});
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2000);
      return;
    }
    if (cmd.label === '[???] Protocol Hint') {
      alert('💡 Protocol Hint: Try typing ZION or the classic 10-key Konami sequence... ↑↑↓↓←→←→BA');
      onClose();
      return;
    }
    cmd.action();
    onClose();
  };

  // Group the filtered commands
  const groups = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  // Flat index tracking
  let flatIdx = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed top-14 sm:top-24 left-1/2 -translate-x-1/2 z-[301] w-[calc(100vw-1.5rem)] max-w-xl max-h-[80dvh] flex flex-col font-mono overflow-hidden"
            style={{
              background: 'rgba(5, 5, 8, 0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '1rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8 shrink-0">
              <svg className="w-4 h-4 text-zinc-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands..."
                className="flex-grow bg-transparent outline-none text-sm text-white placeholder-zinc-500 font-mono"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="text-[10px] text-zinc-500 shrink-0">ESC to close</span>
            </div>

            {/* Results */}
            <div ref={listRef} className="flex-1 max-h-[calc(80dvh-120px)] sm:max-h-96 overflow-y-auto py-2">
              {Object.entries(groups).map(([group, cmds]) => (
                <div key={group}>
                  <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest text-zinc-500">
                    {group}
                  </div>
                  {cmds.map((cmd) => {
                    const idx = flatIdx++;
                    const isSelected = idx === selectedIdx;
                    return (
                      <button
                        key={cmd.label}
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setSelectedIdx(idx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                          isSelected ? 'bg-white/8 text-white' : 'text-zinc-300 hover:bg-white/5'
                        }`}
                      >
                        <span className="text-base w-5 text-center shrink-0">{cmd.icon}</span>
                        <span>{cmd.label}</span>
                        {isSelected && (
                          <span className="ml-auto text-[10px] text-zinc-500">↵ ENTER</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-zinc-500">
                  No commands match "{query}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-4 text-[10px] text-zinc-500">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>ESC close</span>
              <span className="ml-auto">{filtered.length} commands</span>
            </div>
          </motion.div>

          {/* Copy Toast */}
          <AnimatePresence>
            {copyToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] px-4 py-2.5 rounded-full bg-emerald-500 text-black text-sm font-semibold shadow-lg"
              >
                ✓ Email copied to clipboard
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
