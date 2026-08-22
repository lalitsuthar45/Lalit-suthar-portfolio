import { Code2, Database, Globe, Terminal, Wrench } from 'lucide-react';
import type { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'Building clean, responsive and interactive web experiences.',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-400',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'Responsive Design', level: 85 },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    description: 'Programming fundamentals, problem solving and application logic.',
    icon: Code2,
    gradient: 'from-purple-500 to-fuchsia-400',
    skills: [
      { name: 'C', level: 80 },
      { name: 'C++', level: 82 },
      { name: 'Python', level: 72 },
      
    ],
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Working with relational databases and structured data.',
    icon: Database,
    gradient: 'from-emerald-400 to-teal-500',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'SQL', level: 78 },
      { name: 'DBMS', level: 80 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Everyday development tools used for learning and projects.',
    icon: Wrench,
    gradient: 'from-amber-400 to-orange-500',
    skills: [
      { name: 'Git & GitHub', level: 75 },
      { name: 'VS Code', level: 88 },
      { name: 'Android Studio', level: 65 },
      { name: 'Vercel', level: 70 },
      { name: 'Netlify', level: 70 },
    ],
  },
  {
    id: 'fundamentals',
    title: 'Core Concepts',
    description: 'The fundamentals behind reliable software development.',
    icon: Terminal,
    gradient: 'from-indigo-500 to-blue-400',
    skills: [
      { name: 'Data Structures', level: 75 },
      { name: 'Algorithms', level: 72 },
      { name: 'OOP', level: 78 },
      { name: 'Problem Solving', level: 80 },
    ],
  },
];

export const HERO_TECH = [
  'HTML',
  'CSS',
  'JavaScript',
  'C',
  'C++',
  'Python',
  'MySQL',
  'GitHub',
] as const;
