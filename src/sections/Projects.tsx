'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Route, Target } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Dialog } from '@/components/ui/Dialog';
import { Badge } from '@/components/ui/Badge';
import { Stagger } from '@/components/ui/Reveal';
import { PROJECT_CATEGORIES, PROJECTS, type ProjectFilter } from '@/constants/projects';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const visibleProjects = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-0 -z-10 hidden h-96 w-96 rounded-full bg-violet-accent/10 blur-[130px] lg:block"
      />

      <div className="container-page">
        <SectionHeading
          eyebrow="Projects"
          title={<span id="projects-heading">Things I&apos;ve built and</span>}
          highlight="shipped"
          description="Production modules from the ERP and POS platform at VasyERP. Open any card for the full case study."
        />

        {/* ------------------------------- Filters ------------------------------ */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = filter === category;
            const count =
              category === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(category)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors',
                  isActive ? 'text-white' : 'glass text-muted hover:text-[color:var(--fg)]',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="project-filter-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-brand-600 to-accent-500 shadow-[0_8px_28px_-10px_rgba(59,130,246,0.9)]"
                  />
                ) : null}
                {category}
                <span
                  className={cn('ml-1.5 text-[11px]', isActive ? 'text-white/70' : 'text-subtle')}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* -------------------------------- Grid -------------------------------- */}
        {/* Keyed on the filter so the stagger replays when the list changes. */}
        <Stagger
          key={filter}
          className="projects-grid mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          stagger={0.06}
        >
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenCaseStudy={setActiveProject} />
          ))}
        </Stagger>
      </div>

      {/* ----------------------------- Case study ----------------------------- */}
      <Dialog
        open={activeProject !== null}
        onClose={() => setActiveProject(null)}
        title={activeProject ? `${activeProject.title} case study` : 'Case study'}
      >
        {activeProject ? <CaseStudy project={activeProject} /> : null}
      </Dialog>
    </section>
  );
}

function CaseStudy({ project }: { project: Project }) {
  const { icon: Icon } = project;

  const sections = [
    { key: 'problem', title: 'The Problem', icon: Target, body: project.caseStudy.problem },
    { key: 'approach', title: 'The Approach', icon: Route, body: project.caseStudy.approach },
    { key: 'impact', title: 'The Impact', icon: Lightbulb, body: project.caseStudy.impact },
  ] as const;

  return (
    <div>
      {/* Header banner */}
      <div
        className={cn('relative overflow-hidden bg-linear-to-br px-6 py-8 sm:px-8', project.gradient)}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),' +
              'linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="relative flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <div className="min-w-0 pr-8">
            <h2 className="text-xl font-bold text-white sm:text-2xl">{project.title}</h2>
            <p className="mt-1 text-sm text-white/85">{project.tagline}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-7 px-6 py-7 sm:px-8">
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>

        {sections.map(({ key, title, icon: SectionIcon, body }) => (
          <div key={key}>
            <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
              <SectionIcon className="h-4 w-4 text-brand-400" aria-hidden />
              {title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{body}</p>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase">Key Features</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-[13px] leading-relaxed text-muted"
              >
                <span
                  className={cn(
                    'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-r',
                    project.gradient,
                  )}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase">Technology Stack</h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge variant="accent">{tech}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
