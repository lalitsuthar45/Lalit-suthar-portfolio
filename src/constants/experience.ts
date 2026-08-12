import type { ExperienceItem } from '@/types';

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'developer',
    company: 'Personal Projects',
    role: 'Web Developer',
    duration: '2025 – Present',
    location: 'India',
    type: 'Project Based',
    summary:
      'Building responsive and modern web applications while developing practical skills in frontend and backend technologies.',
    responsibilities: [
      'Developing responsive web interfaces',
      'Working with HTML, CSS and JavaScript',
      'Building projects with React and Next.js',
      'Managing projects using Git and GitHub',
    ],
    achievements: [
      'Created multiple frontend projects',
      'Built and deployed personal portfolio websites',
      'Improved practical web development skills through projects',
    ],
    stack: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Next.js',
      'Git',
      'GitHub',
    ],
    current: true,
  },
];
