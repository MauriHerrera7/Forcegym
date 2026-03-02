import { notFound } from 'next/navigation';
import { muscleData } from '@/lib/muscleData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MuscleDetailPageProps {
  params: {
    muscle: string;
  };
}

export default function MuscleDetailPage({ params }: MuscleDetailPageProps) {
  const muscleInfo = muscleData[params.muscle as keyof typeof muscleData];

  if (!muscleInfo) {
    notFound();
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'advanced':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return difficulty;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/client/training">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver al Selector
        </Button>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">{muscleInfo.name}</h1>
        <p className="mt-2 text-lg text-gray-400">{muscleInfo.description}</p>
      </div>

      {/* Exercises Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {muscleInfo.exercises.map((exercise) => (
          <Card key={exercise.id} className="bg-[#191919] border-[#404040]">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-white">{exercise.name}</CardTitle>
                <Badge
                  className={getDifficultyColor(exercise.difficulty)}
                  variant="default"
                >
                  {getDifficultyLabel(exercise.difficulty)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Thumbnail */}
              <div 
                className="relative aspect-video overflow-hidden rounded-lg bg-gray-800 cursor-pointer group"
                onClick={() => window.open(exercise.videoUrl, '_blank')}
              >
                <Image
                  src={exercise.thumbnailUrl}
                  alt={exercise.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/60">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-white transition-transform group-hover:scale-110 shadow-[0_0_20px_rgba(255,4,0,0.4)]">
                    <Play className="h-8 w-8" fill="white" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">{exercise.description}</p>

              {/* Action Button */}
              <Button 
                className="w-full gap-2 bg-[#ff0400] hover:bg-[#d60400] text-white font-bold"
                onClick={() => window.open(exercise.videoUrl, '_blank')}
              >
                <Play className="h-4 w-4" fill="white" />
                Ver Video Instructivo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Training Tips */}
      <Card className="bg-dark-soft border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Consejos de Entrenamiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-300">
          <p>• Calienta adecuadamente antes de comenzar</p>
          <p>• Mantén una técnica correcta en todo momento</p>
          <p>• Controla la respiración durante cada repetición</p>
          <p>• Descansa entre series según tu nivel</p>
          <p>• Aumenta el peso progresivamente</p>
        </CardContent>
      </Card>
    </div>
  );
}
