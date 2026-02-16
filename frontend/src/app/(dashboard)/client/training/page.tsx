'use client';

import { useRouter } from 'next/navigation';
import { MuscleSelector } from '@/components/training/MuscleSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrainingPage() {
  const router = useRouter();

  const handleMuscleClick = (muscleId: string) => {
    router.push(`/client/training/${muscleId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Entrenamiento</h1>
        <p className="text-gray-400">
          Selecciona un grupo muscular para ver ejercicios y videos
        </p>
      </div>

      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white text-center">
            Selector de Músculos Interactivo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <MuscleSelector onMuscleClick={handleMuscleClick} />
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white">Cómo Usar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-300">
          <p>1. Selecciona entre vista frontal o posterior del cuerpo</p>
          <p>2. Pasa el mouse sobre los grupos musculares para resaltarlos</p>
          <p>3. Haz clic en un músculo para ver ejercicios específicos</p>
          <p>4. Cada ejercicio incluye videos instructivos y descripciones detalladas</p>
        </CardContent>
      </Card>
    </div>
  );
}
