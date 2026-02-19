'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { SvgWrapper } from './anatomical/SvgWrapper';
import { bodyFront as maleFront } from './anatomical/bodyFrontData';
import { bodyBack as maleBack } from './anatomical/bodyBackData';
import { bodyFemaleFront } from './anatomical/bodyFemaleFrontData';
import { bodyFemaleBack } from './anatomical/bodyFemaleBackData';
import { BodyPart } from './anatomical/types';
import { useAuthContext } from '@/providers/AuthProvider';

interface MuscleSelectorProps {
  onMuscleClick: (muscleId: string) => void;
}

export function MuscleSelector({ onMuscleClick }: MuscleSelectorProps) {
  const { user } = useAuthContext();
  const initialGender = user?.gender || 'male';
  
  const [activeGender, setActiveGender] = useState<'male' | 'female'>(initialGender);

  // Sync with auth user gender if it changes
  useEffect(() => {
    if (user?.gender) {
      setActiveGender(user.gender);
    }
  }, [user?.gender]);

  const anatomicalData = useMemo(() => {
    return activeGender === 'female' 
      ? { front: bodyFemaleFront, back: bodyFemaleBack }
      : { front: maleFront, back: maleBack };
  }, [activeGender]);

  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const muscleMapping: Record<string, string> = {
    'chest': 'chest',
    'abs': 'abs',
    'obliques': 'abs',
    'biceps': 'biceps',
    'triceps': 'triceps',
    'forearm': 'forearms',
    'quadriceps': 'quadriceps',
    'adductors': 'quadriceps',
    'calves': 'calves',
    'hamstring': 'hamstrings',
    'gluteal': 'glutes',
    'upper-back': 'back',
    'lower-back': 'back',
    'deltoids': 'shoulders',
    'trapezius': 'shoulders',
    'neck': 'shoulders',
  };

  const handleMuscleClick = (muscle: BodyPart) => {
    const targetId = muscleMapping[muscle.slug] || muscle.slug;
    setSelectedMuscle(muscle.slug);
    onMuscleClick(targetId);
  };

  const NON_INTERACTIVE = new Set(['head', 'hair', 'neck', 'hands', 'hand', 'feet', 'foot', 'tibialis', 'knees']);

  const getMuscleName = (slug: string) =>
    anatomicalData.front.find((m) => m.slug === slug)?.slug ||
    anatomicalData.back.find((m) => m.slug === slug)?.slug ||
    slug;

  const renderPaths = (
    paths: string[],
    slug: string,
    sideLabel?: string,
    muscles?: BodyPart[],
    muscleColor?: string
  ) => {
    const isNonInteractive = NON_INTERACTIVE.has(slug);
    const isSelected = !isNonInteractive && selectedMuscle === slug;
    const isHovered = !isNonInteractive && hoveredMuscle === slug;
    const isHead = slug === 'head' || slug === 'hair';
    const isActive = isSelected || isHovered;
    const defaultMuscleColor = muscleColor || '#6b7280';

    return paths.map((d, i) => (
      <path
        key={`${slug}-${sideLabel}-${i}`}
        d={d}
        fill={isSelected ? '#ff0400' : isHovered ? '#ff6b68' : defaultMuscleColor}
        fillOpacity={isActive ? 0.9 : isHead ? 0.35 : 0.5}
        stroke={isSelected ? '#ff0400' : isHovered ? '#ff6b68' : defaultMuscleColor}
        strokeWidth="1"
        strokeOpacity={isActive ? 0.9 : isHead ? 0.7 : 0.4}
        className={isNonInteractive ? 'cursor-default' : 'cursor-pointer transition-all duration-150'}
        onMouseEnter={() => !isNonInteractive && setHoveredMuscle(slug)}
        onMouseLeave={() => setHoveredMuscle(null)}
        onClick={() => {
          const found = muscles?.find((m) => m.slug === slug);
          if (found && !isNonInteractive) handleMuscleClick(found);
        }}
      />
    ));
  };

  const renderMuscles = (muscles: BodyPart[]) =>
    muscles.map((muscle) => (
      <g key={muscle.slug}>
        {muscle.path.common && renderPaths(muscle.path.common, muscle.slug, undefined, muscles, muscle.color)}
        {muscle.path.left && renderPaths(muscle.path.left, muscle.slug, 'left', muscles, muscle.color)}
        {muscle.path.right && renderPaths(muscle.path.right, muscle.slug, 'right', muscles, muscle.color)}
      </g>
    ));

  return (
    <>
      <div className="flex flex-col items-center gap-6 w-full">
        {/* Gender Toggle */}
        <div className="flex p-1 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] gap-1">
          <button
            onClick={() => setActiveGender('male')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-200",
              activeGender === 'male' 
                ? "bg-[#ff0400] text-white shadow-[0_0_12px_rgba(255,4,0,0.3)]" 
                : "text-gray-500 hover:text-gray-300 hover:bg-[#252525]"
            )}
          >
            Hombre
          </button>
          <button
            onClick={() => setActiveGender('female')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-200",
              activeGender === 'female' 
                ? "bg-[#ff0400] text-white shadow-[0_0_12px_rgba(255,4,0,0.3)]" 
                : "text-gray-500 hover:text-gray-300 hover:bg-[#252525]"
            )}
          >
            Mujer
          </button>
        </div>

        {/* Side-by-side models */}
        <div className="flex gap-6 w-full justify-center">
          {/* Anterior */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold">
              Anterior
            </span>
            <div className="bg-[#111111]/60 rounded-2xl border border-[#2a2a2a] p-5 flex items-center justify-center w-[270px] h-[540px]">
              <SvgWrapper side="front" gender={activeGender}>
                {renderMuscles(anatomicalData.front)}
              </SvgWrapper>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-[#2a2a2a] self-stretch my-8" />

          {/* Posterior */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-semibold">
              Posterior
            </span>
            <div className="bg-[#111111]/60 rounded-2xl border border-[#2a2a2a] p-5 flex items-center justify-center w-[270px] h-[540px]">
              <SvgWrapper side="back" gender={activeGender}>
                {renderMuscles(anatomicalData.back)}
              </SvgWrapper>
            </div>
          </div>
        </div>

        {/* Selected muscle indicator */}
        <div
          className={cn(
            'flex items-center gap-2.5 px-5 py-2 rounded-xl border bg-[#1a1a1a] transition-all duration-200',
            selectedMuscle
              ? 'opacity-100 border-[#ff0400]/40 shadow-[0_0_16px_rgba(255,4,0,0.1)]'
              : 'opacity-0 pointer-events-none border-transparent'
          )}
        >
          <div className="w-2 h-2 rounded-full bg-[#ff0400] shadow-[0_0_6px_#ff0400]" />
          <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-medium">
            Seleccionado:
          </p>
          <p className="text-white font-black uppercase tracking-[0.1em] text-sm">
            {selectedMuscle ? getMuscleName(selectedMuscle) : ''}
          </p>
        </div>

        <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-medium mt-1">
          Selecciona un grupo muscular
        </p>
      </div>

      {/* Mouse-following tooltip — fixed to viewport, follows cursor */}
      {hoveredMuscle && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: mousePos.x + 18,
            top: mousePos.y - 14,
          }}
        >
          {/* Left arrow */}
          <div className="absolute top-[14px] -left-[6px] w-3 h-3 rotate-45 bg-[#1a1a1a] border-l border-b border-[#ff0400]/50" />
          {/* Box */}
          <div className="bg-[#1a1a1a] border border-[#ff0400]/50 rounded-xl px-4 py-2.5 shadow-[0_0_24px_rgba(255,4,0,0.2)] min-w-[148px]">
            <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500 mb-0.5 font-medium">
              Grupo muscular
            </p>
            <p className="text-white font-black uppercase tracking-[0.1em] text-sm leading-tight">
              {getMuscleName(hoveredMuscle)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
