'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice, usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  intensity?: number;
  /** Render the cursor-tracking spotlight highlight. */
  glare?: boolean;
}

/**
 * 3D tilt on pointer move, driven entirely by motion values so the transform
 * runs on the compositor instead of triggering React renders.
 * Disabled on touch devices and under reduced-motion.
 */
export function TiltCard({ children, className, intensity = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReduced = usePrefersReducedMotion();
  const disabled = isTouch || prefersReduced;

  const springConfig = { stiffness: 260, damping: 24, mass: 0.5 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  // Normalised pointer position, used to place the glare highlight.
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBackground = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.14), transparent 60%)`;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * intensity * 2);
    rotateX.set(-(py - 0.5) * intensity * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        disabled
          ? undefined
          : { rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }
      }
      className={cn('relative', className)}
    >
      {children}
      {glare && !disabled ? (
        <motion.span
          aria-hidden
          style={{ background: glareBackground }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}
    </motion.div>
  );
}
