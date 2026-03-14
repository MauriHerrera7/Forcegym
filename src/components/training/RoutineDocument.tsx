'use client';

import React from 'react';
import { Dumbbell, Clock, Info, User, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface RoutineExercise {
  id: string;
  exercise: {
    name: string;
    muscle_group_display: string;
    description: string;
  };
  sets: number;
  reps: number | null;
  duration_seconds: number | null;
  rest_seconds: number;
  notes: string;
  order: number;
}

interface Routine {
  id: string;
  name: string;
  description: string;
  difficulty_display: string;
  estimated_duration_minutes: number;
  created_by_name: string;
  created_at: string;
  routine_exercises: RoutineExercise[];
}

export function RoutineDocument({ routine }: { routine: Routine }) {
  // Group exercises by muscle group
  const groupedExercises = React.useMemo(() => {
    const groups: Record<string, RoutineExercise[]> = {};
    routine.routine_exercises.forEach(ex => {
      const groupName = ex.exercise.muscle_group_display || 'Otros';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(ex);
    });
    // Sort exercises within each group by order
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.order - b.order);
    });
    return groups;
  }, [routine.routine_exercises]);

  return (
    <Card className="bg-white text-black p-8 md:p-12 shadow-2xl relative overflow-hidden print:shadow-none print:p-0">
      {/* Brand Header */}
      <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-red-600 pb-8 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-black uppercase">{routine.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-black text-sm font-medium">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{routine.created_by_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(routine.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-red-600 font-black text-2xl">FORCE<span className="text-black">GYM</span></div>
          <p className="text-[10px] text-black uppercase tracking-widest font-bold">Training Plan Document</p>
        </div>
      </div>

      {/* Routine Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-1">
             <p className="text-[10px] text-black uppercase font-black tracking-wider">Duración Est.</p>
             <p className="font-bold text-black">{routine.estimated_duration_minutes} Minutos</p>
        </div>
        <div className="space-y-1">
             <p className="text-[10px] text-black uppercase font-black tracking-wider">Total Ejercicios</p>
             <p className="font-bold text-black">{routine.routine_exercises.length}</p>
        </div>
        <div className="space-y-1">
             <p className="text-[10px] text-black uppercase font-black tracking-wider">Revision</p>
             <p className="font-bold text-black">v1.0</p>
        </div>
      </div>

      <div className="mb-10">
        <p className="text-sm text-gray-600 italic leading-relaxed">
          {routine.description || "Esta rutina ha sido diseñada para maximizar el rendimiento muscular basándose en ejercicios compuestos y aislamiento progresivo."}
        </p>
      </div>

      {/* Exercises Tables Grouped by Muscle */}
      <div className="space-y-10">
        {Object.entries(groupedExercises).map(([groupName, exercises]) => (
          <div key={groupName} className="space-y-3">
            <div className="flex items-center gap-3 border-l-4 border-red-600 pl-3">
              <h2 className="text-lg font-semibold uppercase text-red-600">{groupName}</h2>
              <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded tracking-widest">{exercises.length}</span>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-12 gap-2 text-[10px] uppercase font-bold text-black border-b border-gray-100 pb-2 px-2 bg-gray-50/50 py-2">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">Ejercicio</div>
                    <div className="col-span-2 text-center">Series</div>
                    <div className="col-span-2 text-center">Reps/Tiempo</div>
                    <div className="col-span-2 text-center">Descanso</div>
                </div>

                {exercises.map((ex, i) => (
                  <div key={ex.id} className="grid grid-cols-12 gap-2 py-4 px-2 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center">
                    <div className="col-span-1 font-bold text-black text-lg">{i + 1}</div>
                    <div className="col-span-5">
                      <p className="font-bold text-sm leading-tight text-black">{ex.exercise.name}</p>
                    </div>
                    <div className="col-span-2 text-center font-bold text-black">{ex.sets}</div>
                    <div className="col-span-2 text-center font-bold text-black text-sm">
                       {ex.reps ? `${ex.reps}` : ex.duration_seconds ? `${ex.duration_seconds}s` : '--'}
                    </div>
                    <div className="col-span-2 text-center font-bold text-black text-sm">{ex.rest_seconds}s</div>
                    
                    {ex.notes && (
                      <div className="col-span-11 col-start-2 mt-2 flex gap-2 items-start">
                        <Info className="h-3 w-3 text-gray-400 mt-0.5" />
                        <p className="text-[10px] text-black italic">{ex.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-end">
        <div>
          <p className="text-[10px] text-black italic leading-tight">© 2026 ForceGym Solutions. Todos los derechos reservados.</p>
          <p className="text-[10px] text-black font-bold mt-1 uppercase tracking-tight">ESTE DOCUMENTO ES PARA USO EXCLUSIVO DEL CLIENTE.</p>
        </div>
        <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center print:hidden">
          <Dumbbell className="h-6 w-6 text-black/20" />
        </div>
      </div>
      
      {/* watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-[0.03] pointer-events-none select-none text-9xl font-black text-black">
        FORCEGYM
      </div>
    </Card>
  );
}
