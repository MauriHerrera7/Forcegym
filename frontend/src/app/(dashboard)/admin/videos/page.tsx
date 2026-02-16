'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Video, Play, Edit, Trash2, Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TrainingVideo {
  id: string;
  title: string;
  url: string;
  muscleGroup: string;
  difficulty: 'Principante' | 'Intermedio' | 'Avanzado';
  description: string;
  thumbnail?: string;
}

export default function AdminVideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');

  // Form state
  const [newVideo, setNewVideo] = useState<Partial<TrainingVideo>>({
    title: '',
    url: '',
    muscleGroup: '',
    difficulty: 'Principante',
    description: '',
  });

  // Mock data
  const [videos, setVideos] = useState<TrainingVideo[]>([
    {
      id: '1',
      title: 'Curl de Bíceps con Barra',
      url: 'https://youtube.com/watch?v=example1',
      muscleGroup: 'Bíceps',
      difficulty: 'Principante',
      description: 'Ejercicio fundamental para desarrollar bíceps.',
    },
    {
      id: '2',
      title: 'Press de Banca Plano',
      url: 'https://youtube.com/watch?v=example2',
      muscleGroup: 'Pecho',
      difficulty: 'Intermedio',
      description: 'El rey de los ejercicios de pecho para fuerza y masa.',
    },
    {
      id: '3',
      title: 'Sentadilla Libre',
      url: 'https://youtube.com/watch?v=example3',
      muscleGroup: 'Piernas',
      difficulty: 'Avanzado',
      description: 'Ejercicio compuesto para todo el tren inferior.',
    },
    {
      id: '4',
      title: 'Dominadas',
      url: 'https://youtube.com/watch?v=example4',
      muscleGroup: 'Espalda',
      difficulty: 'Intermedio',
      description: 'Excelente para ensanchar la espalda.',
    },
  ]);

  const muscleGroups = ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Bíceps', 'Tríceps', 'Abdominales'];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'all' || video.muscleGroup === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  const handleAddVideo = () => {
    if (newVideo.title && newVideo.muscleGroup) {
      const videoToAdd: TrainingVideo = {
        id: Math.random().toString(36).substr(2, 9),
        title: newVideo.title || '',
        url: newVideo.url || '',
        muscleGroup: newVideo.muscleGroup || '',
        difficulty: (newVideo.difficulty as any) || 'Principante',
        description: newVideo.description || '',
      };
      
      setVideos([...videos, videoToAdd]);
      setIsAddModalOpen(false);
      setNewVideo({ title: '', url: '', muscleGroup: '', difficulty: 'Principante', description: '' });
    }
  };

  const deleteVideo = (id: string) => {
    if (confirm('¿Eliminar este video?')) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Videos</h1>
          <p className="text-gray-400">Biblioteca de contenido de entrenamiento</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 bg-[#ff0400] hover:bg-[#ff3936] text-white">
          <Plus className="h-4 w-4" />
          Nuevo Video
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
              />
            </div>
            
            <Select value={selectedMuscle} onValueChange={setSelectedMuscle}>
              <SelectTrigger className="w-full md:w-[200px] bg-[#191919] border-[#404040] text-white">
                <SelectValue placeholder="Grupo Muscular" />
              </SelectTrigger>
              <SelectContent className="bg-[#191919] border-[#404040] text-white">
                <SelectItem value="all">Todos</SelectItem>
                {muscleGroups.map(muscle => (
                  <SelectItem key={muscle} value={muscle}>{muscle}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="bg-[#191919] border-[#404040] overflow-hidden hover:border-[#ff0400]/50 transition-colors">
            {/* Thumbnail Placeholder */}
            <div className="aspect-video bg-[#404040] relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="h-12 w-12 text-gray-600" />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="ghost" className="text-white hover:text-[#ff0400] hover:bg-white/10">
                  <Play className="h-6 w-6" />
                </Button>
              </div>
              <Badge className="absolute top-2 right-2 bg-[#ff0400] text-white border-none">
                {video.muscleGroup}
              </Badge>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white line-clamp-1">{video.title}</h3>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#404040]">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteVideo(video.id)} className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-[#404040]">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{video.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <Badge variant="outline" className="border-[#404040] text-gray-400">
                  {video.difficulty}
                </Badge>
                <span className="text-xs text-gray-500">Video ID: {video.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Video Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="bg-[#191919] border-[#404040] text-white">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Video</Label>
              <Input
                id="title"
                placeholder="Ej: Press de Banca"
                className="bg-[#191919] border-[#404040]"
                value={newVideo.title}
                onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Grupo Muscular</Label>
                <Select
                  value={newVideo.muscleGroup}
                  onValueChange={(val) => setNewVideo({...newVideo, muscleGroup: val})}
                >
                  <SelectTrigger className="bg-[#191919] border-[#404040]">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#191919] border-[#404040] text-white">
                    {muscleGroups.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Dificultad</Label>
                <Select
                  value={newVideo.difficulty}
                  onValueChange={(val) => setNewVideo({...newVideo, difficulty: val as any})}
                >
                  <SelectTrigger className="bg-[#191919] border-[#404040]">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#191919] border-[#404040] text-white">
                    <SelectItem value="Principante">Principante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL del Video (YouTube/Vimeo)</Label>
              <Input
                id="url"
                placeholder="https://..."
                className="bg-[#191919] border-[#404040]"
                value={newVideo.url}
                onChange={(e) => setNewVideo({...newVideo, url: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Instrucciones breves..."
                className="bg-[#191919] border-[#404040]"
                value={newVideo.description}
                onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="border-[#404040] hover:bg-[#404040] text-white">
              Cancelar
            </Button>
            <Button onClick={handleAddVideo} className="bg-[#ff0400] hover:bg-[#ff3936] text-white">
              Guardar Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
