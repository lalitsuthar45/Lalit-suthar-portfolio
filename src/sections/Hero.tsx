'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Typewriter } from '@/components/ui/Typewriter';
import { Particles } from '@/components/effects/Particles';
import { SITE, SOCIALS } from '@/constants/site';
import { HERO_TECH } from '@/constants/skills';
import { letterReveal, staggerContainer } from '@/animations/variants';
import { useIsTouchDevice, usePrefersReducedMotion } from '@/hooks';
import { cn, scrollToSection } from '@/lib/utils';

const NAME_LETTERS = SITE.name.split('');

/** Shared fade-and-rise used by most hero blocks. */
const riseIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  // Parallax: content drifts up and fades as the hero scrolls away.
  const contentY = useTransform(scrollY, [0, 700], [0, 110]);
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  // The portrait drifts slower than the copy, which reads as depth.
  const portraitY = useTransform(scrollY, [0, 700], [0, 52]);
  // …and fades out on the way to the next section, trailing the copy slightly
  // so the hero empties from the text outwards rather than all at once.
  const portraitOpacity = useTransform(scrollY, [60, 540], [1, 0]);

  /*
   * Below `lg` the portrait sits at the bottom of the stack, so an absolute
   * scroll range would start fading it before it has even been scrolled into
   * view. Measuring against the element itself instead keeps it fully opaque
   * until it actually begins leaving the top of the screen, and stretches the
   * fade over its own height — which self-adjusts to any phone size.
   */
  const mobilePortraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileExit } = useScroll({
    target: mobilePortraitRef,
    offset: ['start 15%', 'end start'],
  });
  const mobilePortraitOpacity = useTransform(mobileExit, [0, 0.85], [1, 0]);

  // Pointer position across the hero, normalised to -0.5 … 0.5 on both axes.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Introduction"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="hero-surface relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 lg:pt-32"
    >
      {/* Subtle ambient particles */}
      <Particles density={28} />

      {/* ---- Editorial portrait (right side, 3D aesthetic) ---- */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: portraitY }}
        className="pointer-events-none absolute right-0 bottom-0 z-0 hidden h-[88%] w-[42%] select-none lg:block xl:w-[38%] 2xl:w-[36%]"
      >
        {/*
         * The scroll-driven fade sits on its own layer: the wrapper above
         * already animates `opacity` on entrance, and a `style` opacity there
         * would override it and kill the fade-in.
         */}
        <motion.div style={{ opacity: portraitOpacity }} className="h-full w-full">
          <Portrait
            pointerX={pointerX}
            pointerY={pointerY}
            objectPosition="object-right-bottom"
            priority
          />
        </motion.div>
      </motion.div>

      {/*
       * The scroll fade lives on the children rather than this wrapper: opacity
       * multiplies down the tree, so a fading parent would cap how long the
       * mobile portrait can stay visible no matter what value it carries.
       * `contentY` stays here so the parallax is unchanged.
       */}
      <motion.div style={{ y: contentY }} className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ------------------------------- Copy ------------------------------- */}
          <motion.div style={{ opacity: contentOpacity }} className="lg:col-span-7">
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start gap-6"
            >
              {/* Availability pill */}
              <motion.div
                variants={riseIn()}
                className="glass text-muted inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {SITE.availability}
              </motion.div>

              {/* Greeting */}
              <motion.p variants={riseIn()} className="text-muted text-lg font-medium sm:text-xl">
                Hi, I&apos;m
              </motion.p>

              {/* Name — revealed one letter at a time */}
              <h1 className="text-[clamp(2.5rem,9vw,5.25rem)] leading-[1.05] font-bold tracking-tight">
                <span className="sr-only">{SITE.name}</span>
                <motion.span
                  aria-hidden
                  variants={staggerContainer(0.035, 0.15)}
                  className="inline-flex flex-wrap"
                  style={{ perspective: '600px' }}
                >
                  {NAME_LETTERS.map((letter, index) => (
                    <motion.span
                      key={`${letter}-${index}`}
                      variants={letterReveal}
                      className="text-gradient inline-block"
                    >
                      {letter === ' ' ? ' ' : letter}
                    </motion.span>
                  ))}
                </motion.span>
              </h1>

              {/* Rotating role */}
              <motion.div
                variants={riseIn(0.5)}
                className="flex min-h-[2.5rem] items-center text-xl font-semibold sm:text-2xl lg:text-3xl"
              >
                <Typewriter words={SITE.roles} />
              </motion.div>

              {/* Summary */}
              <motion.p
                variants={riseIn(0.6)}
                className="text-muted max-w-xl text-base leading-relaxed sm:text-[17px]"
              >
                I enjoy building{' '}
                <strong className="font-semibold text-[color:var(--fg)]">responsive</strong>,{' '}
                <strong className="font-semibold text-[color:var(--fg)]">creative</strong> and{' '}
                <strong className="font-semibold text-[color:var(--fg)]">useful</strong>{' '}
                software projects while growing my skills in programming, web development and databases.
              </motion.p>

              {/* Location */}
              <motion.p
                variants={riseIn(0.65)}
                className="text-subtle flex items-center gap-1.5 text-sm"
              >
                <MapPin className="text-brand-400 h-4 w-4" aria-hidden />
                {SITE.location}
              </motion.p>
              {/* Actions */}
              <motion.div variants={riseIn(0.75)} className="flex flex-wrap items-center gap-3">
                <Button size="lg" glow variant="mono" onClick={() => scrollToSection('contact')}>
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Get in Touch
                </Button>

                <ButtonLink href={SITE.resumePath} download variant="secondary" size="lg">
                  <ArrowDown className="h-4 w-4" aria-hidden />
                  Download Resume
                </ButtonLink>
              </motion.div>

              {/* Social icon row */}
              <motion.ul
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.85, staggerChildren: 0.07 } },
                }}
                className="flex items-center gap-3"
              >
                {[
                  { href: SOCIALS.github, label: 'GitHub profile', Icon: Github },
                  { href: SOCIALS.linkedin, label: 'LinkedIn profile', Icon: Linkedin },
                  { href: SOCIALS.email, label: `Email ${SITE.firstName}`, Icon: Mail },
                ].map(({ href, label, Icon }) => (
                  <motion.li
                    key={label}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <motion.a
                      href={href}
                      aria-label={label}
                      {...(href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="glass text-muted hover:border-brand-500/50 hover:text-brand-400 grid h-11 w-11 place-items-center rounded-xl transition-colors"
                    >
                      <Icon className="h-4.5 w-4.5" aria-hidden />
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          {/* ---- Mobile portrait (only shows below lg) ---- */}
          <motion.div
            ref={mobilePortraitRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-4/5 w-full max-w-xs sm:max-w-sm lg:hidden"
          >
            {/* Own layer, so the entrance animation's opacity isn't overridden. */}
            <motion.div style={{ opacity: mobilePortraitOpacity }} className="h-full w-full">
              <Portrait
                pointerX={pointerX}
                pointerY={pointerY}
                objectPosition="object-bottom"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* --------------------------- Tech marquee --------------------------- */}
        {/* Wrapper carries the scroll fade the shared container used to apply. */}
        <motion.div style={{ opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="relative mt-16 overflow-hidden lg:mt-20"
            aria-hidden
          >
            {/* Edge fades so the loop has no visible seam. */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-[color:var(--bg)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-[color:var(--bg)] to-transparent" />

            <div className="animate-marquee flex w-max gap-4">
              {/* Duplicated once so the -50% translate loops seamlessly. */}
              {[...HERO_TECH, ...HERO_TECH].map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="glass text-muted rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-label="Scroll to About section"
        className="text-subtle hover:text-brand-400 absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 transition-colors lg:flex"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
        <span className="grid h-9 w-5.5 justify-center rounded-full border border-current pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-current"
          />
        </span>
      </motion.button>
    </section>
  );
}

interface PortraitProps {
  /** Pointer position across the hero, -0.5 … 0.5. */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  /** Tailwind `object-*` anchor for the portrait inside its box. */
  objectPosition: string;
  priority?: boolean;
}

/**
 * The hero portrait: the photograph cropped at the belt and lifted off its
 * studio backdrop, so the page background — and nothing else — sits behind him
 * in either theme.
 *
 * Depth comes from two layers moving at different rates under the pointer
 * (bloom and subject) rather than from a frame or a card, so the image never
 * reads as a pasted-on rectangle.
 */
function Portrait({ pointerX, pointerY, objectPosition, priority = false }: PortraitProps) {
  const isTouch = useIsTouchDevice();
  const prefersReduced = usePrefersReducedMotion();
  const still = isTouch || prefersReduced;

  const spring = { stiffness: 110, damping: 20, mass: 0.6 };
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [7, -7]), spring);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [-5, 5]), spring);
  const subjectX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), spring);
  const bloomX = useSpring(useTransform(pointerX, [-0.5, 0.5], [20, -20]), spring);

  return (
    <div className="relative h-full w-full" style={{ perspective: '1400px' }}>
      {/*
       * Backdrop bloom, in the site's brand hues. It has no edge of its own, so
       * there is nothing to give away where the photo stops and the page starts.
       */}
      <motion.div
        aria-hidden
        style={still ? undefined : { x: bloomX }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-[6%] blur-2xl"
          style={{
            background:
              'radial-gradient(closest-side, rgb(59 130 246 / 0.16), rgb(139 92 246 / 0.07), transparent 78%)',
          }}
        />
      </motion.div>

      <motion.div
        style={still ? undefined : { rotateX, rotateY, x: subjectX, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        <Image
          src={SITE.profileImage}
          alt={`Portrait of ${SITE.name}, ${SITE.headline}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 42vw, (max-width: 640px) 20rem, 24rem"
          className={cn('object-contain', objectPosition)}
          style={{
            filter:
              'drop-shadow(0 26px 38px rgb(9 9 11 / 0.38)) drop-shadow(0 2px 3px rgb(9 9 11 / 0.18))',
          }}
        />
      </motion.div>
    </div>
  );
}
