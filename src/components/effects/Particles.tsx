'use client';

import { useEffect, useRef } from 'react';
import { useMounted, usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface ParticlesProps {
  className?: string;
  /** Particle count at 1080p; scaled down proportionally on smaller screens. */
  density?: number;
  color?: string;
  /** Draw lines between particles that drift close together. */
  connect?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

const MAX_LINK_DISTANCE = 130;

/**
 * Canvas particle field. One canvas and one rAF loop for the whole effect —
 * far cheaper than animating dozens of DOM nodes.
 *
 * The loop pauses when the section scrolls out of view or the tab is hidden,
 * so it costs nothing while the user is reading elsewhere.
 */
export function Particles({
  className,
  density = 46,
  color = '59, 130, 246',
  connect = true,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted || prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap DPR at 2: beyond that the extra pixels cost more than they show.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((density * width * height) / (1920 * 1080));
      particles = Array.from({ length: Math.max(12, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.6 + 0.5,
        alpha: Math.random() * 0.45 + 0.25,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the edges rather than bouncing — reads as endless drift.
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.fill();
      }

      if (connect) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.hypot(dx, dy);
            if (distance > MAX_LINK_DISTANCE) continue;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color}, ${0.14 * (1 - distance / MAX_LINK_DISTANCE)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (frame) return;
      frame = requestAnimationFrame(draw);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    setup();
    start();

    // Only animate while the canvas is actually on screen.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    visibility.observe(canvas);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibilityChange);

    const resizeObserver = new ResizeObserver(() => setup());
    resizeObserver.observe(canvas);

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [mounted, prefersReduced, density, color, connect]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10 h-full w-full', className)}
    />
  );
}
