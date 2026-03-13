'use client';

import { RoutineCreationForm } from '@/components/training/RoutineCreationForm';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateRoutinePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/client/routines">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">Crear Nueva Rutina</h1>
      </div>

      <RoutineCreationForm />
    </div>
  );
}
