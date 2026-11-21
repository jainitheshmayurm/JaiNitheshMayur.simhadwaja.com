import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, socialLinks } from '../data/portfolioData';
import { sound } from '../utils/audioSystem';

const RESUME_MAILTO = `mailto:${personalInfo.email}?subject=Resume%20Request%20-%20Jai%20Nithesh%20Mayur%20M&body=Hi%20Jai%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20request%20your%20latest%20resume.`;

const SocialIcon = ({ type, size = 'w-4 h-4' }) => {
  const icons = {
    linkedin: (
      <svg className={size} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    facebook: (
      <svg className={size} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    github: (
      <svg className={size} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    x: (
      <svg className={size} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  };
  return icons[type] || null;
};

export default function ContactDrawer({ isOpen, onClose }) {
  const [copyToast, setCopyToast] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setTimeout(() => drawerRef.current?.focus(), 50);
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(personalInfo.email).catch(() => {});
    sound.playConfirm?.();
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sound.playClick();
    const encodedSubject = encodeURIComponent(subject || 'Portfolio Contact');
    const encodedBody = encodeURIComponent(
      `Name: ${name}\n\n${message}\n\n---\nSent from portfolio contact form.`
    );
    window.open(
      `mailto:${personalInfo.email}?subject=${encodedSubject}&body=${encodedBody}`,
      '_blank'
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Contact & Resume Drawer"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[201] w-full sm:max-w-lg h-[100dvh] overflow-y-auto flex flex-col"
            style={{
              background: 'rgba(5, 5, 5, 0.97)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header with visible [×] close button */}
            <div className="sticky top-0 z-30 backdrop-blur-2xl bg-obsidian/95 border-b border-white/10 p-5 sm:p-6 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white">Contact & Resume</h2>
              <button
                onClick={onClose}
                className="shrink-0 w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-white/15 text-zinc-200 hover:text-white hover:border-white/35 hover:bg-white/10 transition-all font-mono text-lg font-bold"
                aria-label="Close drawer"
              >
                ×
              </button>
            </div>

            <div className="p-5 sm:p-6 flex-1">

              {/* 1-Click Copy Email */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.04] border border-white/[0.09]">
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Email</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-sm text-white select-all">{personalInfo.email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="shrink-0 px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono text-zinc-200 hover:text-white hover:border-white/40 hover:bg-white/8 transition-all"
                  >
                    {copyToast ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Resume Block */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.04] border border-white/[0.09]">
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">Resume</p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="/resume.pdf"
                    download="Jai_Nithesh_Mayur_M_Resume.pdf"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    Download Resume (PDF)
                  </a>
                  <a
                    href={RESUME_MAILTO}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-white/20 text-zinc-200 text-sm font-mono hover:text-white hover:border-white/40 hover:bg-white/8 transition-all"
                  >
                    Request Latest Resume
                  </a>
                </div>
              </div>

              {/* Quick Message Composer */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.04] border border-white/[0.09]">
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">Quick Message</p>
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div>
                    <label className="text-xs font-mono text-zinc-500 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Smith"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-500 block mb-1">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Collaboration / Internship / Project"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-500 block mb-1">Message</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Jai, I'd like to..."
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all font-mono resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all"
                  >
                    Send via Email Client →
                  </button>
                  <p className="text-[10px] text-zinc-500 text-center font-mono">
                    Opens your email client with a pre-filled message
                  </p>
                </form>
              </div>

              {/* Verified Profiles */}
              <div>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">Verified Profiles</p>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all text-sm font-mono"
                    >
                      <SocialIcon type={link.icon} />
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Toast */}
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
