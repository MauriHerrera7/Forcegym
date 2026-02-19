'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, History, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MUSCLE_GROUPS } from '@/lib/constants';

interface ProgressLog {
  id: string;
  date: string;
  exercise: string;
  weight: number;
  reps: string;
}

export function ProgressTab() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [logs, setLogs] = useState<ProgressLog[]>([]);
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load logs from localStorage
  useEffect(() => {
    const savedLogs = localStorage.getItem('forcegym_progress_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save logs to localStorage
  useEffect(() => {
    localStorage.setItem('forcegym_progress_logs', JSON.stringify(logs));
  }, [logs]);

  const dateKey = selectedDate.toISOString().split('T')[0];

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exercise || !weight) return;

    const newLog: ProgressLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: dateKey,
      exercise,
      weight: parseFloat(weight),
      reps,
    };

    setLogs([...logs, newLog]);
    setExercise('');
    setWeight('');
    setReps('');
  };

  const removeLog = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const dailyLogs = logs.filter(log => log.date === dateKey);
  
  // Calendar logic
  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const days = [];
  const totalDays = daysInMonth(currentMonth);
  const startDay = firstDayOfMonth(currentMonth);

  // Padding for start of month
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const hasLogsOnDate = (date: Date) => {
    const key = date.toISOString().split('T')[0];
    return logs.some(log => log.date === key);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        {/* Calendar Card */}
        <Card className="bg-[#191919] border-[#404040]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-[#ff0400]" />
              Calendario de Progreso
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8 border-[#404040] hover:bg-[#404040]">
                <ChevronLeft className="h-4 w-4 text-white" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 border-[#404040] hover:bg-[#404040]">
                <ChevronRight className="h-4 w-4 text-white" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4 text-white font-medium">
              {currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, i) => {
                if (!date) return <div key={i} className="h-10" />;
                
                const isSelected = date.toDateString() === selectedDate.toDateString();
                const isToday = date.toDateString() === new Date().toDateString();
                const hasData = hasLogsOnDate(date);

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "h-10 rounded-lg flex flex-col items-center justify-center relative transition-all",
                      isSelected ? "bg-[#ff0400] text-white" : "hover:bg-[#404040] text-gray-400",
                      isToday && !isSelected && "border border-[#ff0400]/50"
                    )}
                  >
                    <span>{date.getDate()}</span>
                    {hasData && (
                      <div className={cn(
                        "absolute bottom-1 w-1 h-1 rounded-full",
                        isSelected ? "bg-white" : "bg-[#ff0400]"
                      )} />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Log Form Card */}
        <Card className="bg-[#191919] border-[#404040]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="h-5 w-5 text-[#ff0400]" />
              Anotar Progreso - {selectedDate.toLocaleDateString('es-ES')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddLog} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="exercise" className="text-gray-400">Ejercicio</Label>
                <Input
                  id="exercise"
                  placeholder="Ej: Press de Banca, Sentadillas..."
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                  className="bg-[#0A0A0A] border-[#404040] text-white focus:ring-[#ff0400]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="weight" className="text-gray-400">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.5"
                    placeholder="70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-[#0A0A0A] border-[#404040] text-white focus:ring-[#ff0400]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reps" className="text-gray-400">Series x Reps</Label>
                  <Input
                    id="reps"
                    placeholder="3x12"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="bg-[#0A0A0A] border-[#404040] text-white focus:ring-[#ff0400]"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#ff0400] hover:bg-[#ff0400]/90 text-white">
                Guardar Progreso
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* History Table Card */}
        <Card className="bg-[#191919] border-[#404040] h-full">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <History className="h-5 w-5 text-[#ff0400]" />
              Registros del Día
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dailyLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Dumbbell className="h-12 w-12 mb-4 opacity-20" />
                <p>No hay registros para este día</p>
                <p className="text-sm">¡Anota tu entrenamiento!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dailyLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 rounded-lg bg-[#0A0A0A] border border-[#404040]">
                    <div>
                      <h4 className="font-medium text-white">{log.exercise}</h4>
                      <p className="text-sm text-gray-400">
                        {log.weight} kg {log.reps && `• ${log.reps}`}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeLog(log.id)}
                      className="text-gray-500 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Dumbbell(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-1-1" />
      <path d="m3 3 1 1" />
      <path d="m18 22 4-4" />
      <path d="m2 6 4-4" />
      <path d="m3 10 7-7" />
      <path d="m14 21 7-7" />
    </svg>
  );
}
