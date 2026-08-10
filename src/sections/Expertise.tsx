'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Stagger } from '@/components/ui/Reveal';
import { GridBackground } from '@/components/effects/GridBackground';
import { EXPERTISE_GROUPS } from '@/constants/expertise';
import { fadeInUp, viewportOnce } from '@/animations/variants';
import { cn } from '@/lib/utils';

/** Simplified request path, rendered as an animated architecture diagram. */
const FLOW = [
  { label: 'Client', detail: 'Web · POS · Kiosk' },
  { label: 'API Gateway', detail: 'Routing · Auth' },
  { label: 'Microservices', detail: 'Spring Boot · Feign' },
  { label: 'Kafka', detail: 'Async events' },
  { label: 'Data Layer', detail: 'PostgreSQL · Redis' },
] as const;

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="relative section-padding">
      <GridBackground size={96} />

      <div className="container-page">
        <SectionHeading
          eyebrow="Technical Expertise"
          title={<span id="expertise-heading">Depth where it</span>}
          highlight="counts"
          description="The concepts I reach for when designing a system — not just the tools, but the reasoning behind them."
        />

        {/* --------------------------- Architecture flow -------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mt-12"
        >
          <GlassCard hover={false} className="p-6 sm:p-8">
            <h3 className="text-center text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              A request through the systems I build
            </h3>

            <ol className="mt-7 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
              {FLOW.map((node, index) => (
                <li key={node.label} className="flex flex-1 items-center gap-3 lg:flex-col lg:gap-3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ delay: index * 0.12, duration: 0.5 }}
                    className="relative flex-1 rounded-xl border border-[color:var(--border)] bg-[color:var(--glass)] px-4 py-3 text-center lg:w-full lg:flex-none"
                  >
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-brand-500 to-accent-500 px-1.5 py-px font-mono text-[10px] font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-[13px] font-semibold">{node.label}</p>
                    <p className="mt-0.5 text-[11px] text-subtle">{node.detail}</p>
                  </motion.div>

                  {/* Connector — a pulse travels along it towards the next node. */}
                  {index < FLOW.length - 1 ? (
                    <div
                      aria-hidden
                      className="relative h-6 w-px shrink-0 overflow-hidden bg-[color:var(--border)] lg:hidden"
                    >
                      <motion.span
                        animate={{ y: ['-100%', '200%'] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: 'linear',
                        }}
                        className="absolute inset-x-0 h-3 bg-linear-to-b from-transparent via-brand-400 to-transparent"
                      />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>

            {/* Horizontal connector for the lg+ row layout. */}
            <div
              aria-hidden
              className="mt-4 hidden h-px w-full overflow-hidden bg-[color:var(--border)] lg:block"
            >
              <motion.span
                animate={{ x: ['-15%', '115%'] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
                className="block h-px w-[15%] bg-linear-to-r from-transparent via-brand-400 to-transparent"
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* ----------------------------- Expertise grid ---------------------------- */}
        <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.06}>
          {EXPERTISE_GROUPS.map((group) => (
            <motion.div key={group.id} variants={fadeInUp} className="h-full">
              <GlassCard className="h-full p-5" gradient={group.gradient}>
                <span
                  className={cn(
                    'inline-grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br text-white shadow-lg transition-transform duration-300 group-hover/card:scale-110',
                    group.gradient,
                  )}
                >
                  <group.icon className="h-5 w-5" aria-hidden />
                </span>

                <h3 className="mt-4 text-[15px] font-semibold">{group.title}</h3>

                <ul className="mt-3.5 flex flex-wrap gap-1.5">
                  {group.topics.map((topic, index) => (
                    <motion.li
                      key={topic}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: index * 0.035, duration: 0.35 }}
                      whileHover={{ scale: 1.06 }}
                      className="cursor-default rounded-md border border-[color:var(--border)] px-2 py-1 text-[11.5px] text-muted transition-colors hover:border-brand-500/50 hover:text-brand-400"
                    >
                      {topic}
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
