'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Stagger } from '@/components/ui/Reveal';
import { SKILL_CATEGORIES } from '@/constants/skills';
import { fadeInUp, viewportOnce } from '@/animations/variants';
import { cn } from '@/lib/utils';

export function Skills() {
  // Category cards default to chips; expanding one swaps in the proficiency meters.
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative section-padding">
      {/* Ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-96 w-[42rem] max-w-[95vw] -translate-x-1/2 rounded-full bg-brand-600/10 blur-[130px]"
      />

      <div className="container-page">
        <SectionHeading
          eyebrow="Skills"
          title={<span id="skills-heading">The stack I build</span>}
          highlight="with"
          description="Grouped by where they sit in the system. Open a category to see proficiency levels."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3" stagger={0.07}>
          {SKILL_CATEGORIES.map((category) => {
            const isExpanded = expandedId === category.id;
            const panelId = `skills-panel-${category.id}`;

            return (
              <motion.div key={category.id} variants={fadeInUp} className="h-full">
                <GlassCard className="flex h-full flex-col p-6" gradient={category.gradient}>
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        'inline-grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br text-white shadow-lg transition-transform duration-300 group-hover/card:scale-110 group-hover/card:-rotate-6',
                        category.gradient,
                      )}
                    >
                      <category.icon className="h-5.5 w-5.5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill chips */}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={viewportOnce}
                        transition={{ delay: index * 0.03, duration: 0.35 }}
                        whileHover={{ y: -3, scale: 1.06 }}
                        className="cursor-default rounded-lg border border-[color:var(--border)] bg-[color:var(--glass)] px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 hover:border-brand-500/50 hover:text-brand-400"
                      >
                        {skill.name}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Proficiency meters */}
                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        id={panelId}
                        key="meters"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 flex flex-col gap-3.5 border-t border-[color:var(--border)] pt-5">
                          {category.skills.map((skill, index) => (
                            <ProgressBar
                              key={skill.name}
                              label={skill.name}
                              value={skill.level}
                              gradient={category.gradient}
                              delay={index * 0.05}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : category.id)}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    className="mt-5 w-fit self-start text-[13px] font-medium text-brand-600 dark:text-brand-400 transition-colors hover:text-accent-500 dark:hover:text-accent-400"
                  >
                    {isExpanded ? 'Hide proficiency' : 'Show proficiency'}
                    <span aria-hidden className="ml-1 inline-block">
                      {isExpanded ? '↑' : '↓'}
                    </span>
                  </button>
                </GlassCard>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
