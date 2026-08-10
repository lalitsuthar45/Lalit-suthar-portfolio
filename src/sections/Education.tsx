'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CalendarDays, GraduationCap, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { EDUCATION } from '@/constants/education';
import { viewportOnce } from '@/animations/variants';

export function Education() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 70%'],
  });
  const spineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="education" aria-labelledby="education-heading" className="relative section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-0 -z-10 h-80 w-80 rounded-full bg-accent-500/10 blur-[120px]"
      />

      <div className="container-page">
        <SectionHeading
          eyebrow="Education"
          title={<span id="education-heading">Foundations, formally</span>}
          highlight="earned"
          description="A five-year integrated degree, completed while working full time as a Software Engineer."
        />

        <div ref={timelineRef} className="relative mx-auto mt-14 max-w-3xl">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[19px] w-px bg-[color:var(--border)]"
          >
            <motion.div
              style={{ scaleY: spineScale }}
              className="h-full w-full origin-top bg-linear-to-b from-accent-400 via-brand-500 to-violet-accent"
            />
          </div>

          <ol className="flex flex-col gap-8">
            {EDUCATION.map((item) => (
              <li key={item.id} className="relative pl-12">
                <motion.span
                  aria-hidden
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="absolute top-6 left-0 grid h-10 w-10 place-items-center rounded-full glass-strong"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-linear-to-br from-accent-500 to-brand-500 text-white">
                    <GraduationCap className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GlassCard className="p-6 sm:p-7" gradient="from-cyan-400 to-blue-500">
                    <h3 className="text-lg font-semibold text-balance sm:text-xl">{item.degree}</h3>
                    <p className="mt-1 text-[15px] font-medium text-gradient">{item.institution}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-subtle">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {item.location}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>

                    <div className="mt-5 border-t border-[color:var(--border)] pt-5">
                      <h4 className="text-xs font-semibold tracking-wider text-muted uppercase">
                        Core Coursework
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {item.highlights.map((highlight, index) => (
                          <motion.li
                            key={highlight}
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={viewportOnce}
                            transition={{ delay: index * 0.04, duration: 0.35 }}
                          >
                            <Badge>{highlight}</Badge>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
