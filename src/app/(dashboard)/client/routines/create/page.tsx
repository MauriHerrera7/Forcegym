'use client';

import { RoutineCreationForm } from '@/components/training/RoutineCreationForm';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateRoutinePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-b border-[#303030] pb-6">
        <div className="flex justify-start">
          <Link href="/client/routines">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white transition-colors px-0">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver
            </Button>
          </Link>
        </div>
        
        <div className="text-center order-first md:order-none">
          <h1 className="text-3xl font-medium text-white uppercase tracking-tight">Crear Nueva Rutina</h1>
        </div>

        <div className="flex justify-end invisible md:visible">
          {/* Spacer to maintain center alignment of the title */}
          <div className="w-20"></div>
        </div>
      </div>

      <RoutineCreationForm />
    </div>
  );
}
