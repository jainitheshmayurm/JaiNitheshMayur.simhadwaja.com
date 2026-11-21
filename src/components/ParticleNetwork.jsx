import { useRef, useEffect, useCallback } from 'react';

const PARTICLE_COUNT_MIN = 110;
const PARTICLE_COUNT_MAX = 150;
const CONNECTION_DISTANCE = 140;
const CURSOR_RADIUS = 130;
const CURSOR_FORCE = 0.85;
const BFS_INTERVAL = 8000;
const BFS_STAGGER = 25;
const DPR_CAP = 2;

function getParticleCount() {
  return Math.floor(Math.random() * (PARTICLE_COUNT_MAX - PARTICLE_COUNT_MIN + 1)) + PARTICLE_COUNT_MIN;
}

export default function ParticleNetwork({ isOverrideActive }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const wispsRef = useRef([]);
  const bfsTimerRef = useRef(null);
  const scrollOffsetRef = useRef(0);

  const initParticles = useCallback((width, height) => {
    const count = getParticleCount();
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        baseOpacity: Math.random() * 0.45 + 0.15,
        opacity: 0,
        highlight: 0,
      });
    }
    particlesRef.current = particles;
  }, []);

  const spawnWisp = useCallback((width, height) => {
    return {
      x: Math.random() * width,
      y: height + Math.random() * 50,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 1.8 + 0.8), // upward drift
      radius: Math.random() * 3 + 2,
      maxRadius: Math.random() * 20 + 12,
      growth: Math.random() * 0.08 + 0.04,
      opacity: Math.random() * 0.7 + 0.3,
      maxOpacity: Math.random() * 0.7 + 0.3,
      decay: Math.random() * 0.004 + 0.002,
      color: Math.random() > 0.4 ? '124, 58, 237' : '220, 38, 38', // Violet / Crimson
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleAmp: Math.random() * 1.5 + 0.5,
      age: 0,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);

    let width, height;
    let resizeTimeout;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
      if (isOverrideActive && wispsRef.current.length === 0) {
        for (let i = 0; i < 70; i++) {
          const w = spawnWisp(width, height);
          w.y = Math.random() * height; // spread initial wisps
          wispsRef.current.push(w);
        }
      }
    }

    function debouncedResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        initParticles(width, height);
      }, 250);
    }

    const handleScroll = () => {
      // 0.4x speed for 3D parallax depth
      scrollOffsetRef.current = window.scrollY * 0.4;
    };

    resize();
    window.addEventListener('scroll', handleScroll, { passive: true });

    function handleMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', debouncedResize);

    // BFS Pulse for Standard Mode
    function buildAdjacency(particles) {
      const adj = particles.map(() => []);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (Math.hypot(dx, dy) < CONNECTION_DISTANCE) {
            adj[i].push(j);
            adj[j].push(i);
          }
        }
      }
      return adj;
    }

    function triggerBFS() {
      if (isOverrideActive) return;
      const particles = particlesRef.current;
      if (particles.length === 0) return;

      const adj = buildAdjacency(particles);
      const start = Math.floor(Math.random() * particles.length);
      const visited = new Set([start]);
      const queue = [start];
      const order = [];

      while (queue.length > 0) {
        const node = queue.shift();
        order.push(node);
        for (const neighbor of adj[node]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
        if (order.length > 35) break;
      }

      order.forEach((idx, step) => {
        setTimeout(() => {
          if (particlesRef.current[idx]) {
            particlesRef.current[idx].highlight = 1.0;
          }
        }, step * BFS_STAGGER);
      });
    }

    bfsTimerRef.current = setInterval(triggerBFS, BFS_INTERVAL);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const scrollYOffset = scrollOffsetRef.current;

      if (isOverrideActive) {
        // ============================================================
        // SHADOW MONARCH AWAKENING: Upward-Drifting Shadow Wisps
        // ============================================================
        // Top off wisps
        while (wispsRef.current.length < 85) {
          wispsRef.current.push(spawnWisp(width, height));
        }

        for (let i = wispsRef.current.length - 1; i >= 0; i--) {
          const w = wispsRef.current[i];
          w.age++;
          w.y += w.vy;
          w.x += Math.sin(w.age * w.wobbleSpeed) * w.wobbleAmp + w.vx;

          if (w.radius < w.maxRadius) {
            w.radius += w.growth;
          }

          w.opacity -= w.decay;

          // Parallax y render
          const renderY = (w.y - (scrollYOffset % height) + height) % height;

          if (w.opacity <= 0 || renderY < -30) {
            wispsRef.current.splice(i, 1);
            continue;
          }

          // Draw smoky wisp radial gradient
          const grad = ctx.createRadialGradient(
            w.x,
            renderY,
            0,
            w.x,
            renderY,
            w.radius
          );
          grad.addColorStop(0, `rgba(${w.color}, ${w.opacity * 0.7})`);
          grad.addColorStop(0.5, `rgba(${w.color}, ${w.opacity * 0.3})`);
          grad.addColorStop(1, `rgba(${w.color}, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(w.x, renderY, w.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // ============================================================
        // STANDARD MODE: Dynamic BFS Particle Graph with Scroll Parallax
        // ============================================================
        const particles = particlesRef.current;

        // Update positions
        for (const p of particles) {
          // Parallax adjusted y
          const effectiveY = (p.y - (scrollYOffset % height) + height) % height;

          // Cursor repulsion
          const dx = p.x - mouse.x;
          const dy = effectiveY - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS && dist > 0) {
            const force = ((CURSOR_RADIUS - dist) / CURSOR_RADIUS) * CURSOR_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }

          p.vx *= 0.985;
          p.vy *= 0.985;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          if (p.highlight > 0) {
            p.highlight = Math.max(0, p.highlight - 0.02);
          }
          p.opacity = p.baseOpacity + p.highlight * 0.65;
        }

        // Draw edges
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          const piY = (pi.y - (scrollYOffset % height) + height) % height;

          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            const pjY = (pj.y - (scrollYOffset % height) + height) % height;

            const dx = pi.x - pj.x;
            const dy = piY - pjY;
            const dist = Math.hypot(dx, dy);

            if (dist < CONNECTION_DISTANCE) {
              const edgeOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.08;
              const highlightBoost = Math.min(pi.highlight, pj.highlight) * 0.6;
              ctx.beginPath();
              ctx.moveTo(pi.x, piY);
              ctx.lineTo(pj.x, pjY);
              ctx.strokeStyle = `rgba(255, 255, 255, ${edgeOpacity + highlightBoost})`;
              ctx.lineWidth = 0.55;
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        for (const p of particles) {
          const py = (p.y - (scrollYOffset % height) + height) % height;

          ctx.beginPath();
          ctx.arc(p.x, py, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();

          if (p.highlight > 0.1) {
            ctx.beginPath();
            ctx.arc(p.x, py, p.radius + 3.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.highlight * 0.35})`;
            ctx.fill();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(bfsTimerRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [isOverrideActive, initParticles, spawnWisp]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
