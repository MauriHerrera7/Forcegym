'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Check, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fetchApi } from '@/lib/api';

interface Exercise {
  id: string;
  name: string;
  muscle_group_display: string;
  difficulty_display: string;
  thumbnail_url: string;
}

interface ExerciseSelectorProps {
  onSelect: (exercise: Exercise) => void;
  selectedIds: string[];
}

export function ExerciseSelector({ onSelect, selectedIds }: ExerciseSelectorProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        
        const response = await fetchApi(`/training/exercises/?${queryParams.toString()}`);
        // Handle paginated (DRF) or plain array responses
        setExercises(Array.isArray(response) ? response : response.results || []);
      } catch (err) {
        console.error('Error fetching exercises', err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchExercises, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  const groupedExercises = React.useMemo(() => {
    const groups: Record<string, Exercise[]> = {};
    exercises.forEach(exercise => {
      const group = exercise.muscle_group_display || 'Otros';
      if (!groups[group]) groups[group] = [];
      groups[group].push(exercise);
    });
    return groups;
  }, [exercises]);

  return (
    <div className="space-y-4">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
        <Input 
          placeholder="Buscar ejercicios..." 
          className="pl-10 bg-[#151515]/80 backdrop-blur-sm border-[#303030] text-white focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar pb-6 scroll-smooth">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-4">
             <div className="relative h-12 w-12">
               <div className="absolute inset-0 rounded-full border-2 border-red-500/20"></div>
               <div className="absolute inset-0 rounded-full border-t-2 border-red-500 animate-spin"></div>
             </div>
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">Cargando catálogo...</p>
          </div>
        ) : Object.keys(groupedExercises).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-[#303030] rounded-2xl bg-[#151515]/30">
            <div className="h-12 w-12 rounded-full bg-gray-800/30 flex items-center justify-center">
              <Search className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold">No se encontraron ejercicios</p>
              <p className="text-xs text-gray-500">Prueba con otros términos de búsqueda</p>
            </div>
          </div>
        ) : (
          Object.entries(groupedExercises).map(([group, groupExercises]) => (
            <div key={group} className="space-y-4">
              <div className="sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-md py-3 z-10 -mx-1 px-1 border-b border-red-500/10 mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-normal uppercase text-red-600 tracking-[0.05em] flex items-center gap-2">
                    {group}
                    <span className="text-xs lowercase font-normal text-white px-2 py-0.5 bg-gray-800/50 rounded-full tracking-normal">
                      {groupExercises.length}
                    </span>
                  </h3>
                </div>
              </div>
              
              <div className="grid gap-3 px-1">
                {groupExercises.map((exercise) => {
                  const isSelected = selectedIds.includes(exercise.id);
                  return (
                    <div 
                      key={exercise.id}
                      onClick={() => onSelect(exercise)}
                      className={cn(
                        "flex items-center gap-4 p-3 bg-[#151515] border-[#252525] transition-all duration-300 group/item relative overflow-hidden rounded-xl cursor-pointer border",
                        isSelected 
                          ? 'border-red-500/40 bg-red-500/[0.03] ring-1 ring-red-500/20' 
                          : 'hover:border-[#404040] hover:bg-[#1c1c1c] hover:translate-x-1'
                      )}
                    >
                      {/* Checkbox Visual */}
                      <div className={cn(
                        "h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0",
                        isSelected 
                          ? "bg-red-600 border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.3)]" 
                          : "border-[#404040] group-hover/item:border-red-500/50"
                      )}>
                        {isSelected && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-base font-medium truncate transition-colors",
                          isSelected ? "text-red-400" : "text-white group-hover/item:text-red-400"
                        )}>
                          {exercise.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
