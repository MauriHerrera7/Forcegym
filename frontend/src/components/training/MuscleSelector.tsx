'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface MuscleGroup {
  id: string;
  name: string;
  path: string;
}

const frontMuscles: MuscleGroup[] = [
  {
    id: 'pecho',
    name: 'Pecho',
    path: 'M250,150 L280,170 L280,220 L250,240 L220,220 L220,170 Z',
  },
  {
    id: 'abdominales',
    name: 'Abdominales',
    path: 'M240,250 L260,250 L260,320 L240,320 Z',
  },
  {
    id: 'biceps',
    name: 'Bíceps Izquierdo',
    path: 'M190,180 L210,180 L210,240 L190,240 Z',
  },
  {
    id: 'biceps-r',
    name: 'Bíceps Derecho',
    path: 'M290,180 L310,180 L310,240 L290,240 Z',
  },
  {
    id: 'cuadriceps',
    name: 'Cuádriceps Izquierdo',
    path: 'M230,330 L250,330 L250,420 L230,420 Z',
  },
  {
    id: 'cuadriceps-r',
    name: 'Cuádriceps Derecho',
    path: 'M250,330 L270,330 L270,420 L250,420 Z',
  },
  {
    id: 'hombros',
    name: 'Hombro Izquierdo',
    path: 'M200,150 L220,150 L220,180 L200,180 Z',
  },
  {
    id: 'hombros-r',
    name: 'Hombro Derecho',
    path: 'M280,150 L300,150 L300,180 L280,180 Z',
  },
];

const backMuscles: MuscleGroup[] = [
  {
    id: 'espalda',
    name: 'Espalda',
    path: 'M220,160 L280,160 L280,260 L220,260 Z',
  },
  {
    id: 'triceps',
    name: 'Tríceps Izquierdo',
    path: 'M190,180 L210,180 L210,240 L190,240 Z',
  },
  {
    id: 'triceps-r',
    name: 'Tríceps Derecho',
    path: 'M290,180 L310,180 L310,240 L290,240 Z',
  },
  {
    id: 'gluteos',
    name: 'Glúteos',
    path: 'M220,270 L280,270 L280,320 L220,320 Z',
  },
  {
    id: 'isquiotibiales',
    name: 'Isquiotibiales Izquierdo',
    path: 'M230,330 L250,330 L250,420 L230,420 Z',
  },
  {
    id: 'isquiotibiales-r',
    name: 'Isquiotibiales Derecho',
    path: 'M250,330 L270,330 L270,420 L250,420 Z',
  },
];

interface MuscleSelectorProps {
  onMuscleClick: (muscleId: string) => void;
}

export function MuscleSelector({ onMuscleClick }: MuscleSelectorProps) {
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');

  const muscles = viewSide === 'front' ? frontMuscles : backMuscles;

  const handleMuscleClick = (muscleId: string) => {
    // Remove -r suffix for right side muscles
    const cleanId = muscleId.replace('-r', '');
    onMuscleClick(cleanId);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Toggle View */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewSide('front')}
          className={cn(
            'rounded-lg px-4 py-2 font-medium transition-colors',
            viewSide === 'front'
              ? 'bg-primary text-white'
              : 'bg-dark-soft text-gray-300 hover:bg-gray-700'
          )}
        >
          Vista Frontal
        </button>
        <button
          onClick={() => setViewSide('back')}
          className={cn(
            'rounded-lg px-4 py-2 font-medium transition-colors',
            viewSide === 'back'
              ? 'bg-primary text-white'
              : 'bg-dark-soft text-gray-300 hover:bg-gray-700'
          )}
        >
          Vista Posterior
        </button>
      </div>

      {/* SVG Body */}
      <div className="rounded-lg bg-dark-soft p-8">
        <svg
          width="500"
          height="600"
          viewBox="0 0 500 600"
          className="max-w-full"
        >
          {/* Head */}
          <circle cx="250" cy="100" r="40" fill="#404040" />

          {/* Body outline */}
          <ellipse cx="250" cy="200" rx="60" ry="80" fill="#2a2a2a" />
          <rect x="220" y="250" width="60" height="100" fill="#2a2a2a" />

          {/* Arms */}
          <rect x="180" y="150" width="30" height="120" fill="#2a2a2a" />
          <rect x="290" y="150" width="30" height="120" fill="#2a2a2a" />

          {/* Legs */}
          <rect x="220" y="350" width="30" height="120" fill="#2a2a2a" />
          <rect x="250" y="350" width="30" height="120" fill="#2a2a2a" />

          {/* Muscle Groups */}
          {muscles.map((muscle) => (
            <path
              key={muscle.id}
              d={muscle.path}
              fill={hoveredMuscle === muscle.id ? '#ff0400' : '#ff3936'}
              opacity={hoveredMuscle === muscle.id ? 0.9 : 0.6}
              stroke="#ff0400"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredMuscle(muscle.id)}
              onMouseLeave={() => setHoveredMuscle(null)}
              onClick={() => handleMuscleClick(muscle.id)}
            />
          ))}
        </svg>
      </div>

      {/* Hovered Muscle Name */}
      {hoveredMuscle && (
        <div className="rounded-lg bg-primary px-4 py-2 text-white font-medium">
          {muscles.find((m) => m.id === hoveredMuscle)?.name}
        </div>
      )}

      <p className="text-center text-sm text-gray-400">
        Haz clic en un grupo muscular para ver ejercicios
      </p>
    </div>
  );
}
