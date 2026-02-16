// Brand Colors
export const COLORS = {
  primary: '#ff0400',
  primarySoft: '#ff3936',
  primaryLight: '#ff7673',
  dark: '#191919',
  darkSoft: '#404040',
} as const;

// Muscle Groups Data
export const MUSCLE_GROUPS = [
  { id: 'chest', name: 'Pecho', slug: 'pecho' },
  { id: 'back', name: 'Espalda', slug: 'espalda' },
  { id: 'shoulders', name: 'Hombros', slug: 'hombros' },
  { id: 'biceps', name: 'Bíceps', slug: 'biceps' },
  { id: 'triceps', name: 'Tríceps', slug: 'triceps' },
  { id: 'forearms', name: 'Antebrazos', slug: 'antebrazos' },
  { id: 'abs', name: 'Abdominales', slug: 'abdominales' },
  { id: 'quadriceps', name: 'Cuádriceps', slug: 'cuadriceps' },
  { id: 'hamstrings', name: 'Isquiotibiales', slug: 'isquiotibiales' },
  { id: 'calves', name: 'Pantorrillas', slug: 'pantorrillas' },
  { id: 'glutes', name: 'Glúteos', slug: 'gluteos' },
] as const;

// API Endpoints (adjust based on your backend)
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
  },
  users: '/api/users',
  memberships: '/api/memberships',
  training: '/api/training',
  videos: '/api/videos',
} as const;
