import { Calculator, Github, PlaySquare } from 'lucide-react';
import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'calculator',
    title: 'Smart Calculator',
    tagline: 'A calculator project focused on logic and clean UI',
    description:
      'A responsive calculator application created to practice programming logic, user interaction and modern interface design.',
    category: 'Full-Stack',
    featured: true,
    icon: Calculator,
    gradient: 'from-blue-500 to-cyan-400',
    features: [
      'Responsive calculator interface',
      'Interactive buttons and calculations',
      'Clean modern layout',
      'Built with HTML, CSS and JavaScript',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    caseStudy: {
      problem:
        'I wanted a practical project to strengthen JavaScript logic and UI skills.',
      approach:
        'Built the calculator from scratch with a responsive interface and interactive calculation logic.',
      impact:
        'Created a complete small web application that can be used as a foundation for larger frontend projects.',
    },
    links: {
      demo: 'https://lalitsuthar45.github.io/mycalculater/',
    },
  },

  {
    id: 'jio-hotstar',
    title: 'Jio Hotstar Login Page',
    tagline: 'A streaming-style login UI recreation',
    description:
      'A frontend project recreating a Jio Hotstar-inspired login experience with a focus on layout, styling and responsive design.',
    category: 'Frontend',
    featured: true,
    icon: PlaySquare,
    gradient: 'from-purple-500 to-fuchsia-400',
    features: [
      'Streaming-inspired interface',
      'Responsive layout',
      'Modern form styling',
      'Frontend-only implementation',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    caseStudy: {
      problem:
        'I wanted to improve my ability to recreate real-world interfaces from visual references.',
      approach:
        'Designed the page structure, styling and responsive behavior with a focus on spacing and visual hierarchy.',
      impact:
        'Strengthened frontend UI implementation and responsive design skills.',
    },
    links: {
      demo: 'https://lalitsuthar45.github.io/jiohotstar/',
    },
  },

  {
    id: 'portfolio',
    title: 'Lalit Suthar Portfolio',
    tagline: 'My personal developer portfolio',
    description:
      'A personal portfolio website showcasing my skills, projects, education and development journey.',
    category: 'Full-Stack',
    icon: Github,
    gradient: 'from-emerald-400 to-teal-500',
    features: [
      'Responsive portfolio layout',
      'Project showcase',
      'Skills and education sections',
      'GitHub and LinkedIn integration',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    caseStudy: {
      problem:
        'I needed a professional place to present my skills and projects online.',
      approach:
        'Created a responsive portfolio and iterated on the UI while learning modern web development.',
      impact:
        'A public portfolio that documents my projects and growth as a developer.',
    },
    links: {
      demo: 'https://lalitsuthar45.github.io/',
    },
  },
];

export const PROJECT_CATEGORIES = [
  'All',
  'Web',
  'Frontend',
  'Full-Stack',
  'Backend',
  'Enterprise',
  'Integration',
] as const;

export type ProjectFilter = (typeof PROJECT_CATEGORIES)[number];