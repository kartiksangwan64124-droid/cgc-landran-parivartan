import { CampusCategory, PosterTheme } from '../types';

export const CGC_CATEGORIES: CampusCategory[] = [
  { id: 'all', name: 'All Locations', color: '#5e72e4', bg: 'bg-[#5e72e4]/10' },
  { id: 'Academic Blocks', name: 'Academic Blocks', color: '#5e72e4', bg: 'bg-[#5e72e4]/10' },
  { id: 'Food & Dining', name: 'Food & Dining', color: '#f5365c', bg: 'bg-[#f5365c]/10' },
  { id: 'Grounds & Parks', name: 'Grounds & Parks', color: '#2dce89', bg: 'bg-[#2dce89]/10' },
  { id: 'Hostels', name: 'Hostels', color: '#8965e0', bg: 'bg-[#8965e0]/10' }
];

export const INITIAL_CATEGORIES = CGC_CATEGORIES;

// Curated Poster Themes for Events
export const POSTER_THEMES: PosterTheme[] = [
  {
    id: 'theme-indigo',
    label: 'Argon Indigo Tech',
    gradient: 'from-[#5e72e4] via-[#485fe0] to-[#172b4d]',
    accent: '#11cdef',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(17,205,239,0.35), transparent 55%)'
  },
  {
    id: 'theme-emerald',
    label: 'Emerald Innovation',
    gradient: 'from-[#2dce89] via-[#1aae6f] to-[#172b4d]',
    accent: '#ffffff',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.25), transparent 50%)'
  },
  {
    id: 'theme-orange',
    label: 'Sunset Cultural',
    gradient: 'from-[#fb6340] via-[#f5365c] to-[#172b4d]',
    accent: '#ffd600',
    pattern: 'radial-gradient(circle at 75% 25%, rgba(251,99,64,0.4), transparent 55%)'
  },
  {
    id: 'theme-purple',
    label: 'Royal Academic',
    gradient: 'from-[#8965e0] via-[#5e72e4] to-[#172b4d]',
    accent: '#11cdef',
    pattern: 'radial-gradient(circle at 30% 30%, rgba(137,101,224,0.4), transparent 55%)'
  },
  {
    id: 'theme-cyan',
    label: 'Cyber Cyan Workshop',
    gradient: 'from-[#11cdef] via-[#5e72e4] to-[#172b4d]',
    accent: '#2dce89',
    pattern: 'radial-gradient(circle at 85% 70%, rgba(45,206,137,0.3), transparent 55%)'
  }
];
