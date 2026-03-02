'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { muscleData } from '@/lib/muscleData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface MuscleDetailPageProps {
  params: Promise<{
    muscle: string;
  }>;
}

export default function MuscleDetailPage({ params }: MuscleDetailPageProps) {
  const { muscle } = use(params);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  
  const muscleInfo = muscleData[muscle as keyof typeof muscleData];

  if (!muscleInfo) {
    notFound();
  }

  const getEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

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
      {/* Header with Back Button on the right */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white uppercase italic tracking-tighter">{muscleInfo.name}</h1>
          <p className="mt-2 text-lg text-gray-400">{muscleInfo.description}</p>
        </div>
        
        <Link href="/client/training" className="shrink-0">
          <Button variant="outline" className="gap-2 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
            <ArrowLeft className="h-4 w-4" />
            Volver a Entrenamiento
          </Button>
        </Link>
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
                onClick={() => setSelectedVideoUrl(exercise.videoUrl)}
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
                variant="outline" 
                className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10"
                onClick={() => setSelectedVideoUrl(exercise.videoUrl)}
              >
                Ver Video
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

      <Dialog open={!!selectedVideoUrl} onOpenChange={(open) => !open && setSelectedVideoUrl(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-zinc-800">
          <DialogHeader className="p-4 bg-zinc-900 border-b border-zinc-800 pr-12 relative">
            <DialogTitle className="text-white">
              {muscleInfo.exercises.find(e => e.videoUrl === selectedVideoUrl)?.name}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Video tutorial del ejercicio
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800">
              <X className="h-5 w-5" />
            </DialogClose>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedVideoUrl && (
              <iframe
                src={getEmbedUrl(selectedVideoUrl) || ''}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}
          </div>
          <DialogFooter className="p-4 bg-zinc-900 border-t border-zinc-800">
            <DialogClose asChild>
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Cerrar Video
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
