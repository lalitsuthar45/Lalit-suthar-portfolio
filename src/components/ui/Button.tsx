'use client';

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { springSnappy } from '@/animations/variants';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'mono';
type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'text-white bg-linear-to-r from-brand-600 via-brand-500 to-accent-500 shadow-[0_10px_40px_-12px_rgba(59,130,246,0.75)]',
  /**
   * Solid slab of the foreground colour with inverted label text — black on
   * white in the light UI, white on black in the dark one. Used where a button
   * should follow the theme instead of the brand gradient.
   */
  mono: 'text-[color:var(--bg)] bg-[color:var(--fg)] shadow-[0_10px_40px_-12px_rgb(9_9_11_/_0.45)] hover:bg-[color:var(--fg-muted)]',
  secondary: 'glass text-[color:var(--fg)] hover:border-brand-500/50',
  outline:
    'border border-[color:var(--border-strong)] bg-transparent text-[color:var(--fg)] hover:border-brand-500/60',
  ghost: 'bg-transparent text-muted hover:text-[color:var(--fg)]',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[13px] gap-1.5 rounded-lg',
  md: 'h-11 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-13 px-7 text-[15px] gap-2.5 rounded-xl',
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a soft animated halo behind the button. */
  glow?: boolean;
  className?: string;
  children: ReactNode;
}

const baseClasses =
  'group relative inline-flex select-none items-center justify-center overflow-hidden font-medium ' +
  'transition-colors duration-300 disabled:pointer-events-none disabled:opacity-55 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500';

/**
 * Sheen that sweeps across the button on hover. `mono` is filled with `--fg`,
 * so a white sweep would be invisible on it in dark mode — it sweeps `--bg`.
 */
function Sheen({ variant }: { variant: ButtonVariant }) {
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent to-transparent transition-transform duration-700 group-hover:translate-x-full',
        variant === 'mono' ? 'via-[color:var(--bg)]/25' : 'via-white/25',
      )}
    />
  );
}

function Glow({ show, variant }: { show?: boolean; variant: ButtonVariant }) {
  if (!show) return null;
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute -inset-1 -z-10 rounded-[inherit] opacity-0 blur-lg transition-opacity duration-300',
        variant === 'mono'
          ? 'bg-[color:var(--fg)] group-hover:opacity-45'
          : 'bg-linear-to-r from-brand-500 to-accent-400 group-hover:opacity-70',
      )}
    />
  );
}

export type ButtonProps = BaseProps &
  Omit<HTMLMotionProps<'button'>, keyof BaseProps | 'ref'> & {
    type?: 'button' | 'submit' | 'reset';
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', glow = false, className, children, ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={springSnappy}
      className={cn(baseClasses, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      <Glow show={glow} variant={variant} />
      <Sheen variant={variant} />
      <span className="relative z-10 inline-flex items-center gap-[inherit]">{children}</span>
    </motion.button>
  );
});

export type ButtonLinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> & {
    href: string;
    download?: boolean | string;
  };

/** Anchor styled as a button. Uses next/link for in-app targets. */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant = 'primary', size = 'md', glow = false, className, children, href, ...props },
  ref,
) {
  const classes = cn(baseClasses, VARIANTS[variant], SIZES[size], className);
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const isHttp = /^https?:/.test(href);

  const content = (
    <>
      <Glow show={glow} variant={variant} />
      <Sheen variant={variant} />
      <span className="relative z-10 inline-flex items-center gap-[inherit]">{children}</span>
    </>
  );

  if (isExternal || props.download !== undefined) {
    return (
      <motion.a
        ref={ref}
        href={href}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={springSnappy}
        className={classes}
        {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(props as ComponentPropsWithoutRef<typeof motion.a>)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={springSnappy}
      className="inline-flex"
    >
      <Link ref={ref} href={href} className={classes} {...props}>
        {content}
      </Link>
    </motion.span>
  );
});
