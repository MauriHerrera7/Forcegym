export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  dni?: string;
  birthDate?: string;
  weight?: number;
  height?: number;
  photo?: string;
  qrCode?: string;
}

export interface Membership {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  features: string[];
  isActive: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in seconds
}

export interface MuscleGroup {
  id: string;
  name: string;
  slug: string;
  description: string;
  exercises: Exercise[];
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
