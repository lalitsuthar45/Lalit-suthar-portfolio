import type { NavLink } from '@/types';

export const SITE = {
  name: 'Lalit Suthar',
  firstName: 'Lalit',
  lastName: 'Suthar',

  role: 'BCA Student & Developer',
  headline: 'Software Developer',

  shortBio:
    'BCA student and developer building responsive websites, useful applications and creative software projects.',

  description:
    'Lalit Suthar is a BCA student and developer from Rajasthan with skills in C, C++, Python, HTML, CSS, JavaScript, MySQL and DBMS.',

  location: 'Rajasthan, India',
  locationShort: 'Rajasthan, India',

  email: 'sutharlalit791@gmail.com',

  phone: '+918306062459',
  phoneHref: 'tel:+918306062459',

  availability: 'Open to learning, projects & opportunities',

  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'https://lalit-suthar.netlify.app',

  resumePath: '/resume/Lalit-Suthar-Resume.pdf',

  profileImage: '/images/profile-full.png',

  locale: 'en_IN',

  roles: [
    'Software Developer',
    'Web Developer',
    'BCA Student',
    'Frontend Developer',
    'Creative Coder',
  ],
} as const;

export const SOCIALS = {
  linkedin: 'https://linkedin.com/in/lalit-suthar-445646334',
  github: 'https://github.com/lalitsuthar45',
  instagram: 'https://instagram.com/lalit_suthar_45',
  email: 'mailto:sutharlalit791@gmail.com',
  phone: 'tel:+918306062459',
} as const;

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const FOOTER_LINKS: NavLink[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const SEO_KEYWORDS = [
  'Lalit Suthar',
  'Lalit Suthar Portfolio',
  'BCA Student',
  'Software Developer',
  'Web Developer',
  'HTML CSS JavaScript',
  'C C++ Python',
  'MySQL DBMS',
  'Rajasthan Developer', 
 ];