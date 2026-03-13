import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoutineOverviewProps {
  routine: {
    name: string;
    scheduled_days: string[];
    exercises_count: number;
  } | null;
  loading?: boolean;
}

export function RoutineOverview({ routine, loading }: RoutineOverviewProps) {
  if (loading) {
    return (
      <Card className="bg-[#191919] border-[#404040] animate-pulse">
        <div className="h-40" />
      </Card>
    );
  }

  if (!routine) {
    return (
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white font-normal flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-red-500" />
            Rutina Asignada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">No tienes una rutina activa asignada actualmente.</p>
        </CardContent>
      </Card>
    );
  }

  const daysLabels: Record<string, string> = {
    'MONDAY': 'Lun',
    'TUESDAY': 'Mar',
    'WEDNESDAY': 'Mié',
    'THURSDAY': 'Jue',
    'FRIDAY': 'Vie',
    'SATURDAY': 'Sáb',
    'SUNDAY': 'Dom'
  };

  const allDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  return (
    <Card className="bg-[#191919] border-[#404040]">
      <CardHeader className="pb-2">
        <CardTitle className="text-white font-normal flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-red-500" />
            Rutina: {routine.name}
          </div>
          <span className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded">Activa</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-400">
           <div className="flex items-center gap-1">
             <CheckCircle2 className="h-4 w-4 text-green-500" />
             <span>{routine.exercises_count} ejercicios</span>
           </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 flex items-center gap-1 uppercase tracking-wider font-bold">
            <Calendar className="h-3 w-3" /> Horario Semanal
          </p>
          <div className="grid grid-cols-7 gap-1">
            {allDays.map(day => (
              <div 
                key={day}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg border text-[10px]",
                  routine.scheduled_days.includes(day)
                    ? "bg-red-500/10 border-red-500/50 text-red-500"
                    : "bg-gray-800/20 border-gray-800 text-gray-600"
                )}
              >
                <span className="font-bold">{daysLabels[day]}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
