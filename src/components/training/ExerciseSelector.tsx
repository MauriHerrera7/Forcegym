'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Check, Info } from 'lucide-react';
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
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (category) queryParams.append('category', category);
        
        const response = await fetchApi(`/training/exercises/?${queryParams.toString()}`);
        setExercises(response);
      } catch (err) {
        console.error('Error fetching exercises', err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchExercises, 300);
    return () => clearTimeout(debounce);
  }, [search, category]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar ejercicios..." 
            className="pl-10 bg-[#191919] border-[#404040] text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Cargando ejercicios...</div>
        ) : exercises.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No se encontraron ejercicios</div>
        ) : (
          exercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className={React.useMemo(() => `flex items-center gap-4 p-3 bg-[#191919] border-[#404040] transition-colors ${selectedIds.includes(exercise.id) ? 'border-red-500/50 bg-red-500/5' : 'hover:border-gray-500'}`, [selectedIds.includes(exercise.id)])}
            >
              <div className="h-12 w-12 rounded bg-gray-800 overflow-hidden flex-shrink-0">
                {exercise.thumbnail_url ? (
                  <img src={exercise.thumbnail_url} alt={exercise.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-600">
                    <Info className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{exercise.name}</p>
                <div className="flex gap-2 text-[10px] text-gray-500">
                  <span>{exercise.muscle_group_display}</span>
                  <span>•</span>
                  <span>{exercise.difficulty_display}</span>
                </div>
              </div>
              <Button 
                size="sm" 
                variant={selectedIds.includes(exercise.id) ? "ghost" : "outline"}
                className={selectedIds.includes(exercise.id) ? "text-green-500" : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"}
                onClick={() => onSelect(exercise)}
              >
                {selectedIds.includes(exercise.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
