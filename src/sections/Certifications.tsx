'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { Badge } from '@/components/ui/Badge';
import { Stagger } from '@/components/ui/Reveal';
import { CERTIFICATIONS } from '@/constants/education';
import { fadeInUp } from '@/animations/variants';
import { cn } from '@/lib/utils';

export function Certifications() {
  // Emptying the constants array removes the section entirely.
  if (CERTIFICATIONS.length === 0) return null;

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative section-padding"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Certifications"
          title={<span id="certifications-heading">Learning that kept</span>}
          highlight="compounding"
          description="Focused study alongside production work — each one directly applied to something I shipped."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
          {CERTIFICATIONS.map((certification) => (
            <motion.div key={certification.id} variants={fadeInUp} className="group h-full">
              <TiltCard className="h-full" intensity={7}>
                <GlassCard className="flex h-full flex-col p-5" gradient={certification.gradient}>
                  {/* Ribbon */}
                  <div
                    aria-hidden
                    className={cn(
                      'absolute top-0 right-0 h-20 w-20 rounded-bl-[100%] bg-linear-to-br opacity-20',
                      certification.gradient,
                    )}
                  />

                  <span
                    className={cn(
                      'inline-grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br text-white shadow-lg',
                      certification.gradient,
                    )}
                  >
                    <BadgeCheck className="h-5 w-5" aria-hidden />
                  </span>

                  <h3 className="mt-4 text-[15px] leading-snug font-semibold">
                    {certification.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] text-muted">{certification.issuer}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-subtle">{certification.date}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {certification.skills.map((skill) => (
                      <li key={skill}>
                        <Badge>{skill}</Badge>
                      </li>
                    ))}
                  </ul>

                  {certification.credentialUrl ? (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-medium text-brand-400 transition-colors hover:text-accent-400"
                    >
                      Verify credential
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  ) : null}
                </GlassCard>
              </TiltCard>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
