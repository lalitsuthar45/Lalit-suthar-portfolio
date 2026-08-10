import type { LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';

/** Any icon component accepted by the UI layer (Lucide or react-icons). */
export type IconComponent = LucideIcon | IconType;

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  /** Section id used for in-page anchors and scroll spy. */
  id: string;
  label: string;
  href: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Skills                                   */
/* -------------------------------------------------------------------------- */

export interface Skill {
  name: string;
  /** Self-assessed proficiency, 0–100. Drives the animated progress bars. */
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: IconComponent;
  /** Tailwind gradient stops, e.g. `from-blue-500 to-cyan-400`. */
  gradient: string;
  skills: Skill[];
}

/* -------------------------------------------------------------------------- */
/*                                 Experience                                 */
/* -------------------------------------------------------------------------- */

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  /** Human-readable range, e.g. `June 2023 – Present`. */
  duration: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  stack: string[];
  current?: boolean;
  /** Optional team/workplace photo rendered as the card's banner. */
  image?: string;
  imageAlt?: string;
  /** Short caption shown over the banner. */
  imageCaption?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */

export type ProjectCategory = 'Enterprise' | 'Backend' | 'Integration' | 'Full-Stack';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** Longer write-up rendered inside the case-study dialog. */
  caseStudy: {
    problem: string;
    approach: string;
    impact: string;
  };
  category: ProjectCategory;
  features: string[];
  stack: string[];
  /**
   * Optional screenshot path, e.g. `/projects/pos-system.png`.
   * When omitted the card renders a generated gradient poster instead.
   */
  image?: string;
  /** Tailwind gradient used for the card glow + poster fallback. */
  gradient: string;
  icon: IconComponent;
  links: {
    github?: string;
    demo?: string;
  };
  featured?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                             Technical expertise                            */
/* -------------------------------------------------------------------------- */

export interface ExpertiseGroup {
  id: string;
  title: string;
  icon: IconComponent;
  gradient: string;
  topics: string[];
}

/* -------------------------------------------------------------------------- */
/*                          Education & certifications                        */
/* -------------------------------------------------------------------------- */

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  gradient: string;
}

/* -------------------------------------------------------------------------- */
/*                                    Stats                                   */
/* -------------------------------------------------------------------------- */

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: IconComponent;
}

/* -------------------------------------------------------------------------- */
/*                                   Contact                                  */
/* -------------------------------------------------------------------------- */

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
