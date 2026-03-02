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
  { id: 'pecho', name: 'Pecho', slug: 'pecho' },
  { id: 'espalda', name: 'Espalda', slug: 'espalda' },
  { id: 'hombros', name: 'Hombros', slug: 'hombros' },
  { id: 'biceps', name: 'Bíceps', slug: 'biceps' },
  { id: 'triceps', name: 'Tríceps', slug: 'triceps' },
  { id: 'antebrazos', name: 'Antebrazos', slug: 'antebrazos' },
  { id: 'abdominales', name: 'Abdominales', slug: 'abdominales' },
  { id: 'cuadriceps', name: 'Cuádriceps', slug: 'cuadriceps' },
  { id: 'isquiotibiales', name: 'Isquiotibiales', slug: 'isquiotibiales' },
  { id: 'pantorrillas', name: 'Pantorrillas', slug: 'pantorrillas' },
  { id: 'gluteos', name: 'Glúteos', slug: 'gluteos' },
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
