import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, X } from 'lucide-react';
import { personalInfo, projects, skillCategories, workstation, education } from '../data/portfolioData';
import { sound } from '../utils/audioSystem';

const BOOT_SEQUENCE = [
  'Initializing Linux 6.1.0-amd64 kernel subsystem...',
  'Mounting Kernel Sandbox & Docker Cgroups (isolated)...',
  'Initializing Active Defense & Intrusion Telemetry...',
  'Establishing Secure Shell (jainithesh@edge-node)...',
  'Security Enclave Verified. Access Granted.',
];

// Slug map for projects
const SLUG_MAP = {
  'hackzion': 'HackZion V.3',
  'sentinel': 'SENTINEL / TRAJEX',
  'trajex': 'SENTINEL / TRAJEX',
  'smart-hers': 'SMART HERS',
  'smarthers': 'SMART HERS',
  'gen-blaze': 'Gen-Blaze Meeting Slot Booking',
  'genblaze': 'Gen-Blaze Meeting Slot Booking',
  'health-link': 'Smart Health Link',
  'healthlink': 'Smart Health Link',
  'smarthealth': 'Smart Health Link',
  'video-pipeline': 'Autonomous Video Pipeline',
  'videopipeline': 'Autonomous Video Pipeline',
  'star-wars-rpg': 'Star Wars Top-Down Action RPG',
  'starwars': 'Star Wars Top-Down Action RPG',
  'starwarsrpg': 'Star Wars Top-Down Action RPG',
};

// Dynamic column formatter
function buildProjectTable() {
  const header = ['CODENAME', 'DATE', 'PRIMARY STACK'];
  const rows = projects.map((p) => [
    p.codename,
    p.date,
    p.tech.slice(0, 3).join(', '),
  ]);

  const cols = [0, 1, 2].map((ci) =>
    Math.max(header[ci].length, ...rows.map((r) => r[ci].length))
  );

  const sep = cols.map((w) => '─'.repeat(w + 3)).join('');
  const fmtRow = (r) => r.map((cell, i) => cell.padEnd(cols[i])).join('   ');

  let table = `MISSION LOGS DIRECTORY (${projects.length} RECORDS):\n`;
  table += sep + '\n';
  table += fmtRow(header) + '\n';
  table += sep + '\n';
  rows.forEach((row) => { table += fmtRow(row) + '\n'; });
  table += sep + '\n';
  table += `Use 'cat projects/<slug>' for details. Available slugs:\n`;
  table += projects.map((p) => `  ${p.slug}`).join('\n');
  return table;
}

// Tab autocomplete candidates
const ALL_COMPLETIONS = [
  'help', 'ls', 'ls projects', 'ls projects/', 'cat bio.txt', 'cat rig.txt',
  'cat education.txt', 'whoami', 'sudo', 'skills', 'clear', 'exit', 'contact', 'resume',
  ...projects.map((p) => `cat projects/${p.slug}`),
  ...projects.map((p) => `open ${p.slug}`),
];

export default function TerminalMode({ onExit, isOverrideActive, onOpenDrawer }) {
  const [booting, setBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [ghost, setGhost] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Cinematic Boot
  useEffect(() => {
    if (bootStep < BOOT_SEQUENCE.length) {
      const timer = setTimeout(() => {
        sound.playKeypress();
        setBootStep((prev) => prev + 1);
      }, 260);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        sound.playConfirm();
        setBooting(false);
        setHistory([
          {
            type: 'system',
            text: `JAI NITHESH MAYUR M // INTERACTIVE SHELL v4.0\nType 'help' for commands. Type 'exit' to return to portfolio.`,
          },
        ]);
      }, 350);
      return () => clearTimeout(finishTimer);
    }
  }, [bootStep]);

  useEffect(() => {
    if (!booting) inputRef.current?.focus();
  }, [booting]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootStep]);

  // Ghost text autocomplete
  useEffect(() => {
    if (!inputVal.trim()) { setGhost(''); return; }
    const match = ALL_COMPLETIONS.find(
      (c) => c.toLowerCase().startsWith(inputVal.toLowerCase()) && c !== inputVal
    );
    setGhost(match ? match.slice(inputVal.length) : '');
  }, [inputVal]);

  const handleCommand = useCallback((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    sound.playClick();
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const args = trimmed.split(' ');
    const cmd = args[0].toLowerCase();
    const target = args.slice(1).join(' ').toLowerCase().trim();

    const newEntries = [{ type: 'command', text: `jainithesh@system:~$ ${raw}` }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help           Display this command reference
  ls [target]    List directory contents ('ls' or 'ls projects')
  cat <file>     Display file contents ('cat bio.txt', 'cat projects/<slug>')
  whoami         Display visitor session details
  sudo [cmd]     Attempt elevated privileges (kernel sandboxed — nice try)
  skills         Dump weaponized engineering stack
  contact        Display contact info & copy email
  resume         Download or request resume
  open <slug>    Exit CLI and open project Architecture Drawer
  clear          Purge terminal output
  exit           Return to portfolio interface

PROJECT SLUGS:
  ${projects.map((p) => p.slug).join('  ')}`,
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'output',
          text: `SESSION INFO:
  visitor@${window.location.hostname}
  Browser:  ${navigator.userAgent.split(' ').slice(-1)[0]}
  Theme:    ${isOverrideActive ? 'Shadow Monarch [ACTIVE]' : 'Standard Glassmorphic'}
  Access:   OBSERVER (read-only, kernel sandboxed)
  Time:     ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
        });
        break;

      case 'sudo':
        sound.playAccessDenied();
        newEntries.push({
          type: 'error',
          text: `[!] ACCESS DENIED: KERNEL SANDBOX ENGAGED.
Elevated privilege attempts logged to security telemetry.
  sudo: ${target || '[command]'}: permission denied (sandbox policy: no-new-privileges)`,
        });
        break;

      case 'ls':
        if (!target || target === '.' || target === '/') {
          newEntries.push({
            type: 'output',
            text: `total 48
\x1b[36mdrwxr-xr-x\x1b[0m  projects/
\x1b[36mdrwxr-xr-x\x1b[0m  skills/
\x1b[32m-rw-r--r--\x1b[0m  bio.txt
\x1b[32m-rw-r--r--\x1b[0m  education.txt
\x1b[32m-rw-r--r--\x1b[0m  rig.txt
\x1b[31m-r--r--r--\x1b[0m  security_protocol.md`,
          });
        } else if (target === 'projects' || target === 'projects/') {
          newEntries.push({ type: 'output', text: buildProjectTable() });
        } else {
          newEntries.push({
            type: 'error',
            text: `ls: cannot access '${target}': No such file or directory`,
          });
        }
        break;

      case 'cat':
        if (!target) {
          newEntries.push({ type: 'error', text: 'cat: missing operand' });
        } else if (target === 'bio.txt') {
          newEntries.push({
            type: 'output',
            text: `max-w-[82ch]\nIDENTIFIER: ${personalInfo.name} (${personalInfo.alias})
ROLE:       ${personalInfo.title}
LOCATION:   ${personalInfo.location}
EMAIL:      ${personalInfo.email}

${personalInfo.bio}`,
          });
        } else if (target === 'rig.txt') {
          let rigText = 'HARDWARE SPECIFICATIONS:\n';
          workstation.forEach((w) => {
            rigText += `  ${w.key.padEnd(14, ' ')} : ${w.value}\n`;
          });
          newEntries.push({ type: 'output', text: rigText });
        } else if (target === 'education.txt') {
          newEntries.push({
            type: 'output',
            text: `DEGREE:      ${education.degree}\nINSTITUTION: ${education.institution}\nAFFILIATION: ${education.affiliation}\nBATCH:       ${education.batch} (${education.semester})\nCGPA:        ${education.cgpa} (First Year)`,
          });
        } else if (target.startsWith('projects/')) {
          const projSlug = target.replace('projects/', '');
          const codename = SLUG_MAP[projSlug];
          const found = codename
            ? projects.find((p) => p.codename === codename)
            : projects.find((p) =>
                p.codename.toLowerCase() === projSlug ||
                p.codename.toLowerCase().includes(projSlug) ||
                p.slug === projSlug
              );
          if (found) {
            newEntries.push({
              type: 'output',
              text: `PROJECT:  ${found.codename} (${found.date})
CATEGORY: ${found.category}
TECH:     ${found.tech.join(', ')}
GITHUB:   ${found.github}

${found.description}

Use 'open ${found.slug}' to open the Architecture Drawer.`,
            });
          } else {
            newEntries.push({ type: 'error', text: `cat: ${target}: File not found in projects directory` });
          }
        } else {
          newEntries.push({ type: 'error', text: `cat: ${target}: No such file or directory` });
        }
        break;

      case 'skills':
        let skillsOut = 'CORE ARSENAL & TOOLCHAINS:\n';
        skillCategories.forEach((cat) => {
          skillsOut += `\n[${cat.title.toUpperCase()}]\n`;
          cat.skills.forEach((s) => { skillsOut += `    ${s}\n`; });
        });
        newEntries.push({ type: 'output', text: skillsOut });
        break;

      case 'contact':
        navigator.clipboard?.writeText(personalInfo.email).catch(() => {});
        newEntries.push({
          type: 'output',
          text: `CONTACT INFORMATION:
  Email:    ${personalInfo.email}  [copied to clipboard]
  LinkedIn: https://www.linkedin.com/in/jainitheshmayurm/
  GitHub:   https://github.com/jainitheshmayurm
  X:        https://x.com/jainitheshmayur
  Facebook: https://www.facebook.com/jainitheshmayur/

Email address has been copied to your clipboard.`,
        });
        break;

      case 'resume':
        newEntries.push({
          type: 'output',
          text: `RESUME OPTIONS:
  1. Download PDF:  /resume.pdf
  2. Request Email: ${personalInfo.email}

Attempting PDF download...`,
        });
        // Trigger download
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = '/resume.pdf';
          a.download = 'Jai_Nithesh_Mayur_M_Resume.pdf';
          a.click();
        }, 300);
        break;

      case 'open':
        if (!target) {
          newEntries.push({ type: 'error', text: 'open: missing project slug. Use: open <slug>' });
        } else {
          const codename = SLUG_MAP[target];
          const found = codename
            ? projects.find((p) => p.codename === codename)
            : projects.find((p) => p.slug === target || p.codename.toLowerCase().includes(target));
          if (found) {
            newEntries.push({ type: 'system', text: `Opening Architecture Drawer for: ${found.codename}...\nReturning to portfolio interface.` });
            setHistory((prev) => [...prev, ...newEntries]);
            setTimeout(() => {
              onExit();
              setTimeout(() => { if (onOpenDrawer) onOpenDrawer(found); }, 300);
            }, 400);
            return;
          } else {
            newEntries.push({ type: 'error', text: `open: project '${target}' not found. Available slugs:\n  ${projects.map(p => p.slug).join(', ')}` });
          }
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        newEntries.push({ type: 'system', text: 'Returning to portfolio interface...' });
        setHistory((prev) => [...prev, ...newEntries]);
        setTimeout(() => { onExit(); }, 300);
        return;

      default:
        newEntries.push({
          type: 'error',
          text: `bash: ${cmd}: command not found. Type 'help' for command list.`,
        });
    }

    setHistory((prev) => [...prev, ...newEntries]);
  }, [isOverrideActive, onExit, onOpenDrawer]);

  const handleKeyDown = (e) => {
    sound.playKeypress();
    if (e.key === 'Tab') {
      e.preventDefault();
      if (ghost) setInputVal((v) => v + ghost);
    } else if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    }
  };

  // Shadow Monarch theme colors
  const theme = isOverrideActive
    ? {
        bg: 'bg-[#060004]',
        textPrimary: 'text-rose-200',
        textSys: 'text-rose-300/90',
        textOut: 'text-rose-200',
        textErr: 'text-red-300',
        textCmd: 'text-white',
        promptColor: '#fda4af',
        border: 'border-rose-500/30',
        headerBorder: 'border-rose-500/30',
        scanlines: 'bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(220,38,38,0.08)_50%)]',
        exitBtn: 'border-rose-400/60 text-rose-100 hover:bg-rose-500/20 hover:border-rose-300',
        topLabel: 'text-rose-200',
        statusBg: 'border-rose-500/20',
        statusText: 'text-rose-300/70',
      }
    : {
        bg: 'bg-[#020502]',
        textPrimary: 'text-green-400',
        textSys: 'text-green-500/80',
        textOut: 'text-green-400',
        textErr: 'text-red-500',
        textCmd: 'text-white',
        promptColor: '#4ade80',
        border: 'border-green-500/30',
        headerBorder: 'border-green-500/30',
        scanlines: 'bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)]',
        exitBtn: 'border-emerald-400/60 text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-300',
        topLabel: 'text-emerald-200',
        statusBg: 'border-green-500/20',
        statusText: 'text-green-500/60',
      };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 ${theme.bg} ${theme.textPrimary} font-mono text-xs sm:text-sm p-4 sm:p-8 h-[100dvh] overflow-y-auto selection:bg-green-500 selection:text-black flex flex-col justify-between`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT Scanline */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.85)_100%)]" />
      <div className={`pointer-events-none fixed inset-0 ${theme.scanlines} bg-[length:100%_4px]`} />

      <div>
        {/* Terminal Header Bar — high contrast */}
        <div className={`flex items-center justify-between pb-3 mb-4 sm:mb-5 border-b gap-2 ${theme.headerBorder}`}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Terminal className={`w-4 h-4 ${theme.textPrimary} animate-pulse shrink-0`} />
            {/* >= 6:1 contrast header label */}
            <span className={`text-xs uppercase tracking-widest font-bold truncate ${theme.topLabel}`}>
              JAI NITHESH MAYUR M // INTERACTIVE SHELL
            </span>
          </div>
          {/* EXIT CLI — >= 7:1 contrast, >= 40px touch target */}
          <button
            onClick={onExit}
            className={`flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs border rounded font-mono font-bold transition-all shrink-0 ${theme.exitBtn}`}
            aria-label="Exit terminal and return to portfolio"
          >
            <X className="w-4 h-4" />
            <span>[EXIT CLI]</span>
          </button>
        </div>

        {/* Boot Phase */}
        {booting && (
          <div className="space-y-1.5 py-4">
            {BOOT_SEQUENCE.slice(0, bootStep).map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className={`font-bold ${theme.textPrimary}`}>[ OK ]</span>
                <span className={theme.textSys}>{log}</span>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <span className={`inline-block w-2.5 h-4 ${isOverrideActive ? 'bg-rose-400' : 'bg-green-400'} animate-pulse`} />
            </div>
          </div>
        )}

        {/* Interactive History */}
        {!booting && (
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'command' && (
                  <p className={`${theme.textCmd} font-bold break-words`}>{item.text}</p>
                )}
                {item.type === 'system' && (
                  <pre className={`${theme.textSys} whitespace-pre-wrap font-mono break-words`}>{item.text}</pre>
                )}
                {item.type === 'output' && (
                  <div className="overflow-x-auto no-scrollbar w-full max-w-full my-1">
                    <pre className={`${theme.textOut} whitespace-pre font-mono max-w-[82ch]`}>{item.text}</pre>
                  </div>
                )}
                {item.type === 'error' && (
                  <pre className={`${theme.textErr} whitespace-pre-wrap font-mono font-bold drop-shadow-[0_0_6px_rgba(239,68,68,0.6)] break-words`}>
                    {item.text}
                  </pre>
                )}
              </div>
            ))}

            {/* Input Line with ghost text */}
            <div className="flex items-center gap-2 mt-4 text-white">
              <span className="font-bold shrink-0" style={{ color: theme.promptColor }}>
                jainithesh@system:~$
              </span>
              <div className="relative flex-grow">
                <span className="text-white font-mono">{inputVal}</span>
                {ghost && (
                  <span className={`font-mono opacity-30 ${theme.textPrimary}`}>{ghost}</span>
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 bg-transparent outline-none border-none text-transparent caret-green-400 font-mono w-full"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Status bar — responsive wrapping */}
      <div className={`mt-6 sm:mt-8 pt-3 sm:pt-4 border-t ${theme.statusBg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[10px] ${theme.statusText}`}>
        <span className="flex items-center gap-1.5">
          <Shield className="w-3 h-3" />
          <span>SECURITY ENCLAVE: ENFORCED</span>
        </span>
        <span className="hidden sm:inline">TAB: autocomplete · ↑↓: history · 'help': commands · 'exit': return</span>
        <span className="sm:hidden text-[9px] text-zinc-500">Type 'help' for commands · 'exit' to return</span>
      </div>
    </motion.div>
  );
}
