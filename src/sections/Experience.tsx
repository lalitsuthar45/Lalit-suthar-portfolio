'use client';

import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  Award,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  MapPin,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { EXPERIENCE } from '@/constants/experience';
import { viewportOnce } from '@/animations/variants';
import { usePrefersReducedMotion } from '@/hooks';
import type { ExperienceItem } from '@/types';

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // The spine fills in as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  });
  const spineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const spineGlow = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-padding relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title={<span id="experience-heading">Where I&apos;ve</span>}
          highlight="shipped"
          description="Production work, the responsibilities behind it, and what actually changed as a result."
        />

        <div ref={timelineRef} className="relative mx-auto mt-14 max-w-3xl lg:mt-16">
          {/* Timeline spine — left-aligned rail, matching the Education section. */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[19px] w-px bg-[color:var(--border)]"
          >
            <motion.div
              style={{ scaleY: spineScale, opacity: spineGlow }}
              className="from-brand-500 via-accent-400 to-violet-accent h-full w-full origin-top bg-linear-to-b"
            />
          </div>

          <ol className="flex flex-col gap-10 lg:gap-14">
            {EXPERIENCE.map((item) => (
              <TimelineEntry key={item.id} item={item} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({ item }: { item: ExperienceItem }) {
  const [expanded, setExpanded] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const detailsId = useId();

  return (
    <li className="relative pl-11 sm:pl-12">
      {/* Node marker */}
      <motion.span
        aria-hidden
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
        className="glass-strong absolute top-6 left-0 grid h-10 w-10 place-items-center rounded-full"
      >
        <span className="from-brand-500 to-accent-500 grid h-7 w-7 place-items-center rounded-full bg-linear-to-br text-white">
          <Briefcase className="h-3.5 w-3.5" aria-hidden />
        </span>
        {item.current ? (
          <span className="border-brand-500/50 absolute inset-0 animate-ping rounded-full border" />
        ) : null}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <GlassCard className="overflow-hidden" gradient="from-blue-500 to-violet-500">
          {/* ----------------------------- Banner ----------------------------- */}
          {item.image ? (
            <div className="group/photo relative aspect-4/3 w-full overflow-hidden sm:aspect-16/9">
              <Image
                src={item.image}
                alt={item.imageAlt ?? `${item.company} team`}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 48rem, 100vw"
                className="object-cover transition-transform duration-700 group-hover/photo:scale-105"
              />
              {/* Scrim keeps the caption legible over a busy photo in both themes. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent"
              />
              {item.imageCaption ? (
                <p className="absolute inset-x-0 bottom-0 p-4 text-[12px] font-medium text-white/90 sm:p-5 sm:text-[13px]">
                  {item.imageCaption}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="p-6 sm:p-7">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold sm:text-xl">{item.role}</h3>
                <p className="text-gradient mt-0.5 text-[15px] font-medium">{item.company}</p>
              </div>
              {item.current ? (
                <Badge variant="accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Current
                </Badge>
              ) : null}
            </div>

            {/* Meta */}
            <div className="text-subtle mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px]">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                {item.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {item.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" aria-hidden />
                {item.type}
              </span>
            </div>

            <p className="text-muted mt-4 text-sm leading-relaxed">{item.summary}</p>

            {/* ------------------------ Expandable detail ------------------------ */}
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  key="details"
                  id={detailsId}
                  initial={prefersReduced ? false : { height: 0, opacity: 0, y: -8 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0, y: -8 }}
                  transition={{
                    height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.3, ease: 'easeOut' },
                    y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="overflow-hidden"
                >
                  {/* Responsibilities */}
                  <div className="mt-5">
                    <h4 className="text-muted text-xs font-semibold tracking-wider uppercase">
                      Responsibilities
                    </h4>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {item.responsibilities.map((responsibility) => (
                        <li
                          key={responsibility}
                          className="text-muted flex items-start gap-2.5 text-[13px] leading-relaxed"
                        >
                          <span className="bg-brand-500 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div className="mt-5">
                    <h4 className="text-muted flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                      <Award className="h-3.5 w-3.5 text-amber-400" aria-hidden />
                      Key Achievements
                    </h4>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {item.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="text-muted flex items-start gap-2.5 text-[13px] leading-relaxed"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                            aria-hidden
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack */}
                  <div className="mt-6 border-t border-[color:var(--border)] pt-5">
                    <h4 className="text-muted text-xs font-semibold tracking-wider uppercase">
                      Technology Stack
                    </h4>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <li key={tech}>
                          <Badge>{tech}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Toggle */}
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              aria-controls={detailsId}
              className="group/toggle text-brand-600 dark:text-brand-400 hover:text-accent-500 dark:hover:text-accent-400 mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
            >
              {expanded ? 'See Less' : 'See More'}
              <ChevronDown
                aria-hidden
                className={`h-4 w-4 transition-transform duration-300 ${
                  expanded ? 'rotate-180' : 'group-hover/toggle:translate-y-0.5'
                }`}
              />
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </li>
  );
}
