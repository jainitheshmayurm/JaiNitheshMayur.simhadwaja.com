import { useState, useEffect } from 'react';
import useOverrideCode from './hooks/useOverrideCode';
import ParticleNetwork from './components/ParticleNetwork';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Arsenal from './components/Arsenal';
import MissionLogs from './components/MissionLogs';
import CombatRecord from './components/CombatRecord';
import Trajectory from './components/Trajectory';
import IdentityFooter from './components/IdentityFooter';
import OverrideHUD from './components/OverrideHUD';
import CustomCursor from './components/CustomCursor';
import TerminalMode from './components/TerminalMode';
import ShatterEffect from './components/ShatterEffect';
import SoloLevelingModal from './components/SoloLevelingModal';
import ProjectDrawer from './components/ProjectDrawer';
import CommandPalette from './components/CommandPalette';
import ContactDrawer from './components/ContactDrawer';
import { sound } from './utils/audioSystem';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [activeDrawerProject, setActiveDrawerProject] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false);

  const {
    isShattering,
    isModalOpen,
    isOverrideActive,
    handleShatterComplete,
    acceptAwakening,
    dismissModal,
    deactivateOverride,
  } = useOverrideCode();

  const handleRTH = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setSoundMuted(nextMuted);
  };

  const handleToggleMotion = () => {
    setMotionEnabled((prev) => !prev);
  };

  // Global Ctrl+K / Cmd+K listener for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isTerminalOpen && (e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen]);

  const handleScrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Tactile Film Grain Noise Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Advanced Inverting Cyber-Cursor */}
      <CustomCursor isOverrideActive={isOverrideActive} />

      {/* Glass Shatter Effect */}
      <ShatterEffect active={isShattering} onComplete={handleShatterComplete} />

      {/* Solo Leveling Awakening Modal */}
      <SoloLevelingModal
        isOpen={isModalOpen}
        onAccept={acceptAwakening}
        onDismiss={dismissModal}
      />

      {/* Background Canvas */}
      {motionEnabled && <ParticleNetwork isOverrideActive={isOverrideActive} />}

      {/* Command Palette — available globally (not in terminal) */}
      {!isTerminalOpen && (
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onScrollTo={handleScrollTo}
          onOpenProject={(project) => { setActiveDrawerProject(project); }}
          onOpenContact={() => setIsContactDrawerOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onToggleSound={handleToggleSound}
          onToggleMotion={handleToggleMotion}
        />
      )}

      {/* Project Architecture Deep-Dive Drawer */}
      <ProjectDrawer
        project={activeDrawerProject}
        onClose={() => setActiveDrawerProject(null)}
      />

      {/* Quick-Contact & Smart Resume Drawer */}
      <ContactDrawer
        isOpen={isContactDrawerOpen}
        onClose={() => setIsContactDrawerOpen(false)}
      />

      {/* Full-Screen Retro CLI Terminal Mode */}
      {isTerminalOpen ? (
        <TerminalMode
          onExit={() => setIsTerminalOpen(false)}
          isOverrideActive={isOverrideActive}
          onOpenDrawer={(project) => { setActiveDrawerProject(project); }}
        />
      ) : (
        <>
          {/* Fixed Glassmorphic Navigation */}
          <Navbar
            onToggleTerminal={() => setIsTerminalOpen(true)}
            soundMuted={soundMuted}
            onToggleSound={handleToggleSound}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onOpenContact={() => setIsContactDrawerOpen(true)}
            motionEnabled={motionEnabled}
            onToggleMotion={handleToggleMotion}
          />

          {/* Main Portfolio Presentation */}
          <main className="relative z-10">
            <Hero onOpenContact={() => setIsContactDrawerOpen(true)} />
            <Arsenal />
            <MissionLogs onOpenDrawer={(project) => setActiveDrawerProject(project)} />
            <CombatRecord />
            <Trajectory />
            <IdentityFooter onOpenContact={() => setIsContactDrawerOpen(true)} />
          </main>

          {/* Shadow Monarch HUD */}
          {isOverrideActive && (
            <OverrideHUD onRTH={handleRTH} onExit={deactivateOverride} />
          )}
        </>
      )}
    </>
  );
}
