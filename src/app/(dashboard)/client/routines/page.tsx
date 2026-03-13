'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Dumbbell, Calendar, Clock, ChevronRight, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fetchApi } from '@/lib/api';

interface Routine {
  id: string;
  name: string;
  difficulty: string;
  difficulty_display: string;
  estimated_duration_minutes: number;
  total_exercises: number;
  is_template: boolean;
  is_active: boolean;
}

export default function RoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await fetchApi('/training/routines/');
        setRoutines(response);
      } catch (err) {
        setError('Error al cargar las rutinas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Mis Rutinas</h1>
          <p className="text-gray-400">Gestiona tus planes de entrenamiento y plantillas</p>
        </div>
        <Link href="/client/routines/create">
          <Button className="bg-red-600 hover:bg-red-700 text-white gap-2 font-bold px-6">
            <Plus className="h-5 w-5" />
            Nueva Rutina
          </Button>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {routines.map((routine) => (
          <Link key={routine.id} href={`/client/routines/${routine.id}`}>
            <Card className="bg-[#191919] border-[#404040] hover:border-red-500/50 transition-all group overflow-hidden">
               <CardHeader className="pb-2">
                 <div className="flex justify-between items-start">
                   <CardTitle className="text-xl text-white font-bold group-hover:text-red-500 transition-colors">
                     {routine.name}
                   </CardTitle>
                   {routine.is_template && (
                     <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full font-bold uppercase">
                       Plantilla
                     </span>
                   )}
                 </div>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="flex items-center gap-2 text-sm text-gray-400">
                     <Dumbbell className="h-4 w-4 text-red-500" />
                     <span>{routine.total_exercises} Ejercicios</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-400">
                     <Clock className="h-4 w-4 text-blue-500" />
                     <span>{routine.estimated_duration_minutes} min</span>
                   </div>
                 </div>

                 <div className="flex items-center justify-between pt-4 border-t border-[#404040]">
                   <span className={cn(
                     "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                     routine.difficulty === 'BEGINNER' ? "bg-green-500/10 text-green-500" :
                     routine.difficulty === 'INTERMEDIATE' ? "bg-yellow-500/10 text-yellow-500" :
                     "bg-red-500/10 text-red-500"
                   )}>
                     {routine.difficulty_display}
                   </span>
                   <div className="flex items-center gap-1 text-gray-500 group-hover:text-white transition-colors text-sm font-medium">
                     Ver Detalle
                     <ChevronRight className="h-4 w-4" />
                   </div>
                 </div>
               </CardContent>
            </Card>
          </Link>
        ))}

        {routines.length === 0 && !loading && (
          <Card className="bg-[#191919] border-[#404040] border-dashed col-span-full p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-gray-800/30 rounded-full">
              <Plus className="h-12 w-12 text-gray-600" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">No tienes rutinas aún</p>
              <p className="text-gray-500">Comienza creando tu primer plan de entrenamiento personalizado.</p>
            </div>
            <Link href="/client/routines/create">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                Crear mi primera rutina
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
