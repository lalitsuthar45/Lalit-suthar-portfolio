'use client';

import { motion } from 'framer-motion';
import { FaJava } from 'react-icons/fa';
import {
  SiApachekafka,
  SiDocker,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSpringboot,
} from 'react-icons/si';
import { usePrefersReducedMotion } from '@/hooks';
import type { IconComponent } from '@/types';

interface FloatingIcon {
  Icon: IconComponent;
  label: string;
  className: string;
  delay: number;
  color: string;
}

const ICONS: FloatingIcon[] = [
  {
    Icon: FaJava,
    label: 'Java',
    className: '-top-3 -left-3 sm:-top-5 sm:-left-5 lg:-top-6 lg:-left-6',
    delay: 0,
    color: 'text-amber-600 dark:text-orange-400',
  },
  {
    Icon: SiPostgresql,
    label: 'PostgreSQL',
    className: '-top-9 left-1/2 -translate-x-1/2 sm:-top-11 lg:-top-12',
    delay: 0.9,
    color: 'text-sky-600 dark:text-sky-400',
  },
  {
    Icon: SiSpringboot,
    label: 'Spring Boot',
    className: '-top-3 -right-3 sm:-top-5 sm:-right-5 lg:-top-6 lg:-right-6',
    delay: 0.6,
    color: 'text-emerald-600 dark:text-green-400',
  },
  {
    Icon: SiApachekafka,
    label: 'Apache Kafka',
    className: 'top-1/2 -right-6 -translate-y-1/2 sm:-right-9 lg:-right-11',
    delay: 1.2,
    color: 'text-zinc-700 dark:text-zinc-300',
  },
  {
    Icon: SiRedis,
    label: 'Redis',
    className: 'bottom-4 right-1 sm:bottom-6 sm:right-2 lg:bottom-8 lg:right-3',
    delay: 0.3,
    color: 'text-red-600 dark:text-red-400',
  },
  {
    Icon: SiDocker,
    label: 'Docker',
    className: 'bottom-4 left-1 sm:bottom-6 sm:left-2 lg:bottom-8 lg:left-3',
    delay: 1.5,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    Icon: SiReact,
    label: 'React',
    className: 'top-1/2 -left-6 -translate-y-1/2 sm:-left-9 lg:-left-11',
    delay: 0.45,
    color: 'text-cyan-600 dark:text-cyan-400',
  },
];

/**
 * Technology icons orbiting directly around the KS portrait logo on the right side.
 */
export function FloatingIcons() {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
      {ICONS.map((icon) => (
        <FloatingIconItem key={icon.label} {...icon} />
      ))}
    </div>
  );
}

function FloatingIconItem({ Icon, className, delay, color }: FloatingIcon) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${className}`}
    >
      <div
        className="grid h-10 w-10 animate-float place-items-center rounded-2xl glass-strong shadow-xl backdrop-blur-md sm:h-12 sm:w-12 lg:h-13 lg:w-13"
        style={{ animationDelay: `${delay}s` }}
      >
        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-6.5 lg:w-6.5 ${color}`} />
      </div>
    </motion.div>
  );
}
