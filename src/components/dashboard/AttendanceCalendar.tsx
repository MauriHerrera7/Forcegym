'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AttendanceCalendarProps {
  attendance: { date: string; attended: boolean }[];
  onToggle: (date: string, attended: boolean) => Promise<void>;
}

export function AttendanceCalendar({ attendance, onToggle }: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDays = daysInMonth(year, month);
  const offset = firstDayOfMonth(year, month);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const getAttendanceForDate = (day: number) => {
    const d = new Date(year, month, day);
    const dateStr = d.toISOString().split('T')[0];
    return attendance.find(a => a.date === dateStr);
  };

  const isSunday = (day: number) => {
    return new Date(year, month, day).getDay() === 0;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  return (
    <Card className="bg-[#191919] border-[#404040]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-white font-normal">Calendario de Asistencia</CardTitle>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentDate(new Date(year, month - 1))}
            className="p-1 hover:bg-gray-800 rounded text-gray-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-white font-medium min-w-[100px] text-center">
            {monthNames[month]} {year}
          </span>
          <button 
            onClick={() => setCurrentDate(new Date(year, month + 1))}
            className="p-1 hover:bg-gray-800 rounded text-gray-400"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
            <span key={d} className="text-[10px] text-gray-500 font-bold uppercase">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={`offset-${i}`} />
          ))}
          {days.map(day => {
            const att = getAttendanceForDate(day);
            const disabled = isSunday(day);
            const today = isToday(day);
            const dateStr = new Date(year, month, day).toISOString().split('T')[0];

            return (
              <button
                key={day}
                disabled={disabled}
                onClick={() => !disabled && onToggle(dateStr, !att?.attended)}
                className={cn(
                  "relative aspect-square rounded-lg flex items-center justify-center text-sm transition-all",
                  disabled ? "opacity-20 cursor-not-allowed bg-gray-900" : "hover:scale-105",
                  today && !att?.attended ? "border-2 border-blue-500" : "border border-[#404040]",
                  att?.attended ? "bg-green-500/20 border-green-500" : "bg-[#191919]"
                )}
              >
                <span className={cn(
                  "font-medium",
                  att?.attended ? "text-green-400" : "text-gray-400",
                  today && "text-white"
                )}>
                  {day}
                </span>
                {att?.attended && (
                  <Check className="absolute top-1 right-1 h-2 w-2 text-green-500" />
                )}
                {!att?.attended && !disabled && !today && (
                  <X className="absolute top-1 right-1 h-2 w-2 text-red-500/30" />
                )}
              </button>
            );
          })}
        </div>
        <div className="flex gap-4 mt-6 text-[10px] text-gray-500 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500/20 border border-green-500 rounded" />
            <span>Asistió</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#191919] border border-[#404040] rounded" />
            <span>No asistió</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-900 opacity-20 border border-[#404040] rounded" />
            <span>Inactivo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
