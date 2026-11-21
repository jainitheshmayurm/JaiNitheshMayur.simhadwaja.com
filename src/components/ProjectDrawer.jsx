import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/audioSystem';

// SVG Architecture Diagram renderer
function ArchDiagram({ nodes, edges }) {
  const W = 640, H = 180;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto min-w-[480px] sm:min-w-0"
      style={{ maxHeight: '200px' }}
      preserveAspectRatio="xMidYMid meet"
      aria-label="System architecture diagram"
    >
      {/* Background */}
      <rect width={W} height={H} fill="#050505" rx="8" />

      {/* Grid lines */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" y1={y} x2={W} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}

      {/* Edges */}
      {edges.map((edge, i) => {
        const from = nodes.find((n) => n.id === edge.from);
        const to = nodes.find((n) => n.id === edge.to);
        if (!from || !to) return null;
        const x1 = from.x + 65, y1 = from.y + 20;
        const x2 = to.x, y2 = to.y + 20;
        const mx = (x1 + x2) / 2;
        return (
          <g key={i}>
            <path
              d={`M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`}
              fill="none"
              stroke="rgba(99,102,241,0.5)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            {/* Arrowhead */}
            <polygon
              points={`${x2},${y2} ${x2 - 7},${y2 - 4} ${x2 - 7},${y2 + 4}`}
              fill="rgba(99,102,241,0.7)"
            />
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const lines = node.label.split('\n');
        return (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width="68"
              height={lines.length > 1 ? '44' : '32'}
              rx="6"
              fill={node.color + '22'}
              stroke={node.color + 'aa'}
              strokeWidth="1"
            />
            {lines.map((line, li) => (
              <text
                key={li}
                x={node.x + 34}
                y={node.y + (lines.length > 1 ? 16 + li * 14 : 20)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontWeight="600"
                fontFamily="ui-monospace, monospace"
                fill={node.color}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export default function ProjectDrawer({ project, onClose }) {
  const overlayRef = useRef(null);

  // Escape key + click outside
  useEffect(() => {
    if (!project) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [project, onClose]);

  // Focus trap
  const drawerRef = useRef(null);
  useEffect(() => {
    if (project && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [project]);

  const RESUME_MAILTO = `mailto:${personalInfo.email}?subject=Project%20Inquiry%20-%20${encodeURIComponent(project?.codename || '')}&body=Hi%20Jai%2C%0A%0AI%20saw%20your%20project%20${encodeURIComponent(project?.codename || '')}%20on%20your%20portfolio%20and%20would%20like%20to%20know%20more.`;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Architecture Deep-Dive: ${project.codename}`}
            tabIndex={-1}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[201] w-full sm:max-w-2xl h-[100dvh] overflow-y-auto font-sans flex flex-col"
            style={{
              background: 'rgba(5, 5, 5, 0.97)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header with visible [×] close button */}
            <div className="sticky top-0 z-30 backdrop-blur-2xl bg-obsidian/95 border-b border-white/10 p-5 sm:p-6 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                    {project.date}
                  </span>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300">
                    {project.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                  {project.codename}
                </h2>
                {project.subtitle && (
                  <p className="font-mono text-xs sm:text-sm text-indigo-400 mt-1">{project.subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-white/15 text-zinc-200 hover:text-white hover:border-white/35 hover:bg-white/10 transition-all font-mono text-lg font-bold"
                aria-label="Close drawer"
              >
                ×
              </button>
            </div>

            <div className="p-5 sm:p-8 flex-1">

              {/* Quick links */}
              <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-white/8">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="btn-interactive inline-flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  GitHub Profile ↗
                </a>
                <a
                  href={RESUME_MAILTO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-interactive inline-flex items-center gap-2"
                >
                  Contact About Project
                </a>
              </div>

              {/* Engineering Problem */}
              <div className="mb-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-400 mb-3">
                  // Engineering Problem & Constraints
                </h3>
                <div
                  className="text-sm text-zinc-300 leading-relaxed max-w-[82ch] p-4 rounded-lg bg-white/[0.03] border border-white/[0.07]"
                >
                  {project.architecture?.problem || project.description}
                </div>
              </div>

              {/* Architecture Diagram */}
              {project.architecture && (
                <div className="mb-8">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-400 mb-3">
                    // System Architecture
                  </h3>
                  <div className="rounded-xl overflow-x-auto no-scrollbar border border-white/[0.08] bg-black/60 p-3 sm:p-4">
                    <ArchDiagram
                      nodes={project.architecture.nodes}
                      edges={project.architecture.edges}
                    />
                  </div>
                </div>
              )}

              {/* Key Outcomes */}
              {project.architecture?.outcomes && (
                <div className="mb-8">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-400 mb-3">
                    // Key Engineering Outcomes
                  </h3>
                  <ul className="space-y-2 max-w-[82ch]">
                    {project.architecture.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className="text-emerald-400 font-bold mt-0.5 shrink-0">→</span>
                        <span className="leading-relaxed">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Stack */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-400 mb-3">
                  // Full Stack Breakdown
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="tag-static">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
