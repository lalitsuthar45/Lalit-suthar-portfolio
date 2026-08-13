'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileText, Printer } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SITE } from '@/constants/site';
import { EXPERIENCE } from '@/constants/experience';
import { scaleIn } from '@/animations/variants';

const HIGHLIGHTS = [
 
] as const;

export function Resume() {
  /**
   * Print the PDF itself rather than the page: load it into a hidden iframe and
   * trigger that frame's print dialog, so the output is the resume, not the site.
   */
  const handlePrint = useCallback(() => {
    document.getElementById('resume-print-frame')?.remove();

    const frame = document.createElement('iframe');
    frame.id = 'resume-print-frame';
    frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
    frame.src = SITE.resumePath;

    frame.onload = () => {
      try {
        frame.contentWindow?.focus();
        frame.contentWindow?.print();
      } catch {
        // Some browsers block cross-frame printing of PDFs — open it instead.
        window.open(SITE.resumePath, '_blank', 'noopener,noreferrer');
      }
    };

    document.body.appendChild(frame);
  }, []);

  const stackPreview = EXPERIENCE[0]?.stack.slice(0, 8) ?? [];

  return (
    <section id="resume" aria-labelledby="resume-heading" className="relative section-padding">
      <div className="container-page">
        <Reveal variants={scaleIn}>
          <GlassCard
            hover={false}
            className="overflow-hidden"
            gradient="from-brand-500 to-violet-500"
          >
            <div className="grid gap-0 lg:grid-cols-12">
              {/* ------------------------- Copy + actions ------------------------- */}
              <div className="p-7 sm:p-10 lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium tracking-[0.18em] text-brand-400 uppercase">
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  Resume
                </span>

                <h2
                  id="resume-heading"
                  className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
                >
                  The full story, in <span className="text-gradient">two pages</span>
                </h2>

                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
                  Every role, project and technology laid out in a format your ATS will happily
                  parse. View it inline, download the PDF, or send it straight to the printer.
                </p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {HIGHLIGHTS.map((highlight, index) => (
                    <motion.li
                      key={highlight}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-start gap-2.5 text-sm text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-r from-brand-500 to-accent-400" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={SITE.resumePath} size="lg" glow>
                    <Eye className="h-4 w-4" aria-hidden />
                    View Resume
                  </ButtonLink>

                  <ButtonLink href={SITE.resumePath} download variant="secondary" size="lg">
                    <Download className="h-4 w-4" aria-hidden />
                    Download
                  </ButtonLink>

                  <Button variant="outline" size="lg" onClick={handlePrint}>
                    <Printer className="h-4 w-4" aria-hidden />
                    Print
                  </Button>
                </div>
              </div>

              {/* ---------------------------- Preview ---------------------------- */}
              <div className="relative flex items-center justify-center border-t border-[color:var(--border)] bg-linear-to-br from-brand-600/10 to-violet-accent/10 p-7 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, rotate: -1 }}
                  className="w-full max-w-[17rem]"
                >
                  {/* Stylised document mock — a visual cue, not the actual PDF. */}
                  <div
                    aria-hidden
                    className="aspect-3/4 w-full rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)] p-5 shadow-2xl"
                  >
                    <div className="h-2.5 w-2/3 rounded-full bg-linear-to-r from-brand-500 to-accent-400" />
                    <div className="mt-2 h-1.5 w-1/3 rounded-full bg-[color:var(--border-strong)]" />

                    <div className="mt-5 flex flex-col gap-1.5">
                      {[100, 92, 78, 88, 64].map((width, index) => (
                        <motion.div
                          key={index}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.07, duration: 0.5 }}
                          style={{ width: `${width}%` }}
                          className="h-1.5 origin-left rounded-full bg-[color:var(--border)]"
                        />
                      ))}
                    </div>

                    <div className="mt-5 h-1.5 w-1/4 rounded-full bg-brand-500/60" />
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      {[96, 84, 90, 70].map((width, index) => (
                        <motion.div
                          key={index}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + index * 0.07, duration: 0.5 }}
                          style={{ width: `${width}%` }}
                          className="h-1.5 origin-left rounded-full bg-[color:var(--border)]"
                        />
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1">
                      {stackPreview.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-sm bg-brand-500/12 px-1.5 py-0.5 text-[7px] font-medium text-brand-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
