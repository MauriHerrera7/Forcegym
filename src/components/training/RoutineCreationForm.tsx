'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Dumbbell, Clock, Settings2, Trash2, GripVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExerciseSelector } from './ExerciseSelector';
import { fetchApi } from '@/lib/api';

interface SelectedExercise {
  id: string;
  name: string;
  exercise_id: string;
  order: number;
  sets: number;
  reps: number | null;
  duration_seconds: number | null;
  rest_seconds: number;
  notes: string;
}

export function RoutineCreationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'BEGINNER',
    estimated_duration_minutes: 60,
    rest_between_sets_seconds: 60,
  });
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);

  const handleExerciseSelect = (exercise: any) => {
    if (selectedExercises.find(e => e.exercise_id === exercise.id)) {
      setSelectedExercises(selectedExercises.filter(e => e.exercise_id !== exercise.id));
    } else {
      setSelectedExercises([
        ...selectedExercises,
        {
          id: Math.random().toString(36).substr(2, 9),
          exercise_id: exercise.id,
          name: exercise.name,
          order: selectedExercises.length,
          sets: 3,
          reps: 12,
          duration_seconds: null,
          rest_seconds: 60,
          notes: ''
        }
      ]);
    }
  };

  const updateExercise = (id: string, updates: Partial<SelectedExercise>) => {
    setSelectedExercises(selectedExercises.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const removeExercise = (id: string) => {
    setSelectedExercises(selectedExercises.filter(e => e.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedExercises.length === 0) {
      alert('Debes agregar al menos un ejercicio');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        is_active: true,
        is_template: false,
        exercises: selectedExercises.map((e, index) => ({
          exercise_id: e.exercise_id,
          order: index,
          sets: e.sets,
          reps: e.reps,
          duration_seconds: e.duration_seconds,
          rest_seconds: e.rest_seconds,
          notes: e.notes
        }))
      };

      await fetchApi('/training/routines/', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      router.push('/client/routines');
    } catch (err) {
      console.error('Error creating routine', err);
      alert('Error al crear la rutina');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
      {/* Left Column: General Info */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-[#191919] border-[#404040]">
          <CardHeader>
            <CardTitle className="text-white">General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-zinc-200">Nombre de la Rutina</label>
              <Input 
                required
                placeholder="Ej: Empuje - Hipertrofia"
                className="bg-[#101010] border-[#303030] text-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-200">Descripción</label>
              <Textarea 
                placeholder="Describe el objetivo de esta rutina..."
                className="bg-[#101010] border-[#303030] text-white h-24"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-zinc-200">Dificultad</label>
                <Select 
                   value={formData.difficulty} 
                   onValueChange={(val) => setFormData({...formData, difficulty: val})}
                >
                  <SelectTrigger className="bg-[#101010] border-[#303030] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#191919] border-[#404040] text-white">
                    <SelectItem value="BEGINNER">Principiante</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermedio</SelectItem>
                    <SelectItem value="ADVANCED">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-200">Duración (min)</label>
                <Input 
                  type="number"
                  className="bg-[#101010] border-[#303030] text-white"
                  value={formData.estimated_duration_minutes}
                  onChange={(e) => setFormData({...formData, estimated_duration_minutes: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#191919] border-[#404040]">
          <CardHeader>
            <CardTitle className="text-white">Seleccionar Ejercicios</CardTitle>
          </CardHeader>
          <CardContent>
            <ExerciseSelector 
              onSelect={handleExerciseSelect}
              selectedIds={selectedExercises.map(e => e.exercise_id)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Exercise Configuration */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-[#191919] border-[#404040] min-h-[600px]">
          <CardHeader className="flex flex-row items-center justify-between border-b border-[#303030] pb-4">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-red-500" />
                Plan de Entrenamiento
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">{selectedExercises.length} ejercicios seleccionados</p>
            </div>
            <div className="flex gap-2">
               <Button type="button" variant="ghost" onClick={() => router.back()} className="text-gray-400">Cancelar</Button>
               <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white font-bold">
                 {loading ? 'Guardando...' : 'Guardar Rutina'}
                 {!loading && <Save className="ml-2 h-4 w-4" />}
               </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {selectedExercises.map((exercise, index) => (
              <div 
                key={exercise.id}
                className="p-4 bg-[#101010] border border-[#303030] rounded-xl space-y-4 group animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/10 text-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <h4 className="text-white font-bold">{exercise.name}</h4>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeExercise(exercise.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-zinc-300 font-bold">Series</label>
                    <Input 
                      type="number"
                      className="h-8 bg-[#191919] border-[#404040] text-white text-sm"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(exercise.id, { sets: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-zinc-300 font-bold">Reps</label>
                    <Input 
                      type="number"
                      placeholder="12"
                      className="h-8 bg-[#191919] border-[#404040] text-white text-sm"
                      value={exercise.reps || ''}
                      onChange={(e) => updateExercise(exercise.id, { reps: e.target.value ? parseInt(e.target.value) : null })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-zinc-300 font-bold">Descanso (s)</label>
                    <Input 
                      type="number"
                      className="h-8 bg-[#191919] border-[#404040] text-white text-sm"
                      value={exercise.rest_seconds}
                      onChange={(e) => updateExercise(exercise.id, { rest_seconds: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-zinc-300 font-bold">Duración (s)</label>
                    <Input 
                      type="number"
                      placeholder="Opcional"
                      className="h-8 bg-[#191919] border-[#404040] text-white text-sm"
                      value={exercise.duration_seconds || ''}
                      onChange={(e) => updateExercise(exercise.id, { duration_seconds: e.target.value ? parseInt(e.target.value) : null })}
                    />
                  </div>
                </div>
                
                <Input 
                  placeholder="Notas adicionales para este ejercicio..."
                  className="h-8 bg-[#191919] border-[#404040] text-white text-xs"
                  value={exercise.notes}
                  onChange={(e) => updateExercise(exercise.id, { notes: e.target.value })}
                />
              </div>
            ))}

            {selectedExercises.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full py-20 text-gray-600">
                <Settings2 className="h-12 w-12 mb-4 opacity-20" />
                <p>Selecciona ejercicios de la izquierda para comenzar</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
