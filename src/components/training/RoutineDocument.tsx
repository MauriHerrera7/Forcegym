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
  return (
    <Card className="bg-white text-black p-8 md:p-12 shadow-2xl relative overflow-hidden print:shadow-none print:p-0">
      {/* Brand Header */}
      <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-red-600 pb-8 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-black uppercase">{routine.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm font-medium">
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
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Training Plan Document</p>
        </div>
      </div>

      {/* Routine Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="space-y-1">
             <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Dificultad</p>
             <p className="font-bold">{routine.difficulty_display}</p>
        </div>
        <div className="space-y-1">
             <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Duración Est.</p>
             <p className="font-bold">{routine.estimated_duration_minutes} Minutos</p>
        </div>
        <div className="space-y-1">
             <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Ejercicios</p>
             <p className="font-bold">{routine.routine_exercises.length}</p>
        </div>
        <div className="space-y-1">
             <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Revision</p>
             <p className="font-bold">v1.0</p>
        </div>
      </div>

      <div className="mb-10">
        <p className="text-sm text-gray-600 italic leading-relaxed">
          {routine.description || "Esta rutina ha sido diseñada para maximizar el rendimiento muscular basándose en ejercicios compuestos y aislamiento progresivo."}
        </p>
      </div>

      {/* Exercises Table */}
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-2 text-[10px] uppercase font-black text-gray-400 border-b border-gray-100 pb-2 px-2">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Ejercicio / Grupo Muscular</div>
            <div className="col-span-2 text-center">Series</div>
            <div className="col-span-2 text-center">Reps / Tiempo</div>
            <div className="col-span-2 text-center">Descanso</div>
        </div>

        {routine.routine_exercises.sort((a,b) => a.order - b.order).map((ex, i) => (
          <div key={ex.id} className="grid grid-cols-12 gap-2 py-4 px-2 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center">
            <div className="col-span-1 font-black text-gray-300 text-lg">{i + 1}</div>
            <div className="col-span-5">
              <p className="font-bold text-sm leading-tight">{ex.exercise.name}</p>
              <p className="text-[10px] text-red-600 font-bold uppercase">{ex.exercise.muscle_group_display}</p>
            </div>
            <div className="col-span-2 text-center font-bold">{ex.sets}</div>
            <div className="col-span-2 text-center font-bold">
               {ex.reps ? `${ex.reps}` : ex.duration_seconds ? `${ex.duration_seconds}s` : '--'}
            </div>
            <div className="col-span-2 text-center font-bold text-gray-500">{ex.rest_seconds}s</div>
            
            {ex.notes && (
              <div className="col-span-11 col-start-2 mt-2 flex gap-2 items-start">
                <Info className="h-3 w-3 text-blue-500 mt-0.5" />
                <p className="text-[10px] text-gray-500 italic">{ex.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-end">
        <div>
          <p className="text-[10px] text-gray-400">© 2026 ForceGym Solutions. Todos los derechos reservados.</p>
          <p className="text-[10px] text-gray-400 font-bold mt-1">ESTE DOCUMENTO ES PARA USO EXCLUSIVO DEL CLIENTE.</p>
        </div>
        <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Dumbbell className="h-6 w-6 text-gray-300" />
        </div>
      </div>
      
      {/* watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-[0.02] pointer-events-none select-none text-9xl font-black">
        FORCEGYM
      </div>
    </Card>
  );
}
