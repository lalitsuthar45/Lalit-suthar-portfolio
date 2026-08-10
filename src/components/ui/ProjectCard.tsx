'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Github } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { TiltCard } from './TiltCard';
import { Badge } from './Badge';
import { Button, ButtonLink } from './Button';
import { fadeInUp } from '@/animations/variants';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

/** Number of stack chips shown before collapsing into a "+N" pill. */
const VISIBLE_STACK = 5;

export function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  const { icon: Icon, links, stack } = project;
  const hiddenStackCount = stack.length - VISIBLE_STACK;

  return (
    <motion.article variants={fadeInUp} className="group h-full">
      <TiltCard className="h-full" intensity={6}>
        <GlassCard className="flex h-full flex-col" gradient={project.gradient}>
          {/* --------------------------- Poster --------------------------- */}
          <div className="relative aspect-16/9 w-full overflow-hidden rounded-t-2xl">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              /* Generated poster — drop a screenshot into `project.image` to replace it. */
              <div
                className={cn(
                  'absolute inset-0 bg-linear-to-br opacity-90 transition-transform duration-700 group-hover:scale-105',
                  project.gradient,
                )}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px),' +
                      'linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                <Icon
                  className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-white/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                  aria-hidden
                />
              </div>
            )}

            <div className="absolute top-3 left-3 z-10">
              <span className="rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                {project.category}
              </span>
            </div>

            {project.featured ? (
              <div className="absolute top-3 right-3 z-10">
                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-900">
                  Featured
                </span>
              </div>
            ) : null}
          </div>

          {/* --------------------------- Content -------------------------- */}
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-1 text-[13px] font-medium text-brand-600 dark:text-brand-400">{project.tagline}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">{project.description}</p>

            {/* Features */}
            <ul className="mt-4 flex flex-col gap-1.5">
              {project.features.slice(0, 3).map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-[12.5px] leading-relaxed text-subtle"
                >
                  <span
                    className={cn(
                      'mt-1.5 h-1 w-1 shrink-0 rounded-full bg-linear-to-r',
                      project.gradient,
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Stack */}
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {stack.slice(0, VISIBLE_STACK).map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
              {hiddenStackCount > 0 ? (
                <li>
                  <Badge variant="outline">+{hiddenStackCount}</Badge>
                </li>
              ) : null}
            </ul>

            {/* Actions — pinned to the bottom so cards line up in the grid. */}
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onOpenCaseStudy(project)}
                aria-label={`Read the case study for ${project.title}`}
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden />
                Case Study
              </Button>

              {links.github ? (
                <ButtonLink
                  href={links.github}
                  size="sm"
                  variant="ghost"
                  aria-label={`${project.title} source on GitHub`}
                >
                  <Github className="h-3.5 w-3.5" aria-hidden />
                  Code
                </ButtonLink>
              ) : null}

              {links.demo ? (
                <ButtonLink
                  href={links.demo}
                  size="sm"
                  variant="ghost"
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  Live Demo
                </ButtonLink>
              ) : null}
            </div>

            {/* Proprietary work has no public repo — say so rather than linking nowhere. */}
            {!links.github && !links.demo ? (
              <p className="mt-2.5 text-[11px] text-subtle">
                Proprietary client work — source not publicly available.
              </p>
            ) : null}
          </div>
        </GlassCard>
      </TiltCard>
    </motion.article>
  );
}
