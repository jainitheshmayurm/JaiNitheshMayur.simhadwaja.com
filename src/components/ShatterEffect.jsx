import { useEffect, useRef } from 'react';
import { sound } from '../utils/audioSystem';

export default function ShatterEffect({ active, onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    sound.playShatter();

    // Generate Delaunay-like triangle shards from center impact
    const shards = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const shardCount = 80;

    for (let i = 0; i < shardCount; i++) {
      const angle = (Math.PI * 2 * i) / shardCount + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 8 + 4;
      const size = Math.random() * 60 + 20;
      shards.push({
        x: centerX + (Math.random() - 0.5) * 60,
        y: centerY + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 2, // slight gravity
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
        size,
        points: [
          { x: 0, y: -size / 2 },
          { x: size / 2, y: size / 2 },
          { x: -size / 2, y: size / 2 },
        ],
        opacity: 0.9,
      });
    }

    let animId;
    const startTime = performance.now();
    const duration = 1200; // 1.2s

    const render = (now) => {
      const elapsed = now - startTime;
      const progress = elapsed / duration;

      ctx.clearRect(0, 0, width, height);

      // Flash crack effect during first 150ms
      if (progress < 0.2) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 * (1 - progress / 0.2)})`;
        ctx.fillRect(0, 0, width, height);
      }

      for (const s of shards) {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vRot;
        s.opacity = Math.max(0, 0.9 * (1 - progress));

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);

        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        ctx.lineTo(s.points[1].x, s.points[1].y);
        ctx.lineTo(s.points[2].x, s.points[2].y);
        ctx.closePath();

        // Shard glass gradient fill
        const grad = ctx.createLinearGradient(-s.size, -s.size, s.size, s.size);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * 0.6})`);
        grad.addColorStop(0.5, `rgba(180, 210, 255, ${s.opacity * 0.3})`);
        grad.addColorStop(1, `rgba(124, 58, 237, ${s.opacity * 0.5})`);

        ctx.fillStyle = grad;
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }

      if (progress < 1) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
    />
  );
}
