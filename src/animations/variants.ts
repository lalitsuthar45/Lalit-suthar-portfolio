import type { Transition, Variants } from 'framer-motion';

/* -------------------------------------------------------------------------- */
/*                                 Transitions                                */
/* -------------------------------------------------------------------------- */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;

export const springSoft: Transition = { type: 'spring', stiffness: 120, damping: 20, mass: 0.6 };
export const springSnappy: Transition = { type: 'spring', stiffness: 380, damping: 30 };

export const baseTransition: Transition = { duration: 0.65, ease: EASE_OUT_EXPO };

/** Shared `whileInView` config — animates once, slightly before full visibility. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' } as const;

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 44 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 18 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/** Parent that reveals children one after another. */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Per-character reveal used by the hero headline. */
export const letterReveal: Variants = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -60 },
  visible: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/** Page-level transition applied by the route transition wrapper. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE_IN_OUT_QUART } },
};
