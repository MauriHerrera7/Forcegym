'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Flame, Clock, Heart, Calendar, Target } from 'lucide-react';

export default function ClientDashboard() {
  const userStats = [
    {
      title: 'Peso Actual',
      value: '75 kg',
      icon: Dumbbell,
      trend: '-2.5 kg',
      subtitle: 'Este mes',
      color: '#3b82f6',
    },
    {
      title: 'Calorías Quemadas',
      value: '12,450',
      icon: Flame,
      trend: '+850 kcal',
      subtitle: 'Esta semana',
      color: '#f59e0b',
    },
    {
      title: 'Tiempo Total',
      value: '24.5 hrs',
      icon: Clock,
      trend: '+3.2 hrs',
      subtitle: 'Este mes',
      color: '#8b5cf6',
    },
    {
      title: 'Frecuencia Cardíaca',
      value: '142 bpm',
      icon: Heart,
      trend: 'Promedio',
      subtitle: 'Última sesión',
      color: '#ef4444',
    },
  ];

  // Datos de progreso de peso (últimos 6 meses)
  const weightData = [
    { month: 'Ago', weight: 82 },
    { month: 'Sep', weight: 80 },
    { month: 'Oct', weight: 78.5 },
    { month: 'Nov', weight: 77 },
    { month: 'Dic', weight: 76 },
    { month: 'Ene', weight: 75 },
  ];

  // Normalizar datos para el gráfico (0-100 scale)
  const maxWeight = Math.max(...weightData.map(d => d.weight));
  const minWeight = Math.min(...weightData.map(d => d.weight));
  const normalizeWeight = (weight: number) => {
    return 100 - ((weight - minWeight) / (maxWeight - minWeight)) * 80 + 10;
  };

  // Datos de asistencia semanal
  const attendanceData = [
    { day: 'Lun', attended: true, intensity: 85 },
    { day: 'Mar', attended: true, intensity: 92 },
    { day: 'Mié', attended: false, intensity: 0 },
    { day: 'Jue', attended: true, intensity: 78 },
    { day: 'Vie', attended: true, intensity: 88 },
    { day: 'Sáb', attended: true, intensity: 95 },
    { day: 'Dom', attended: false, intensity: 0 },
  ];

  // Datos de calorías por día (última semana)
  const caloriesData = [420, 580, 0, 650, 520, 720, 0];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Mi Dashboard</h1>
        <p className="text-gray-400">Seguimiento de tu progreso personal</p>
      </div>

      {/* User Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-[#191919] border-[#404040] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                    <Icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-semibold text-white mb-2">{stat.value}</div>
                <p className="text-sm text-green-400">{stat.trend}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weight Progress Chart */}
        <Card className="bg-[#191919] border-[#404040] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white font-normal">Progreso de Peso</CardTitle>
            <p className="text-sm text-gray-400">Últimos 6 meses</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="weight-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={40 * i + 10}
                    x2="600"
                    y2={40 * i + 10}
                    stroke="#404040"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                ))}
                
                {/* Area chart */}
                <path
                  d={`M 0,${normalizeWeight(weightData[0].weight)} ${weightData.map((d, i) => `L ${(i * 600) / (weightData.length - 1)},${normalizeWeight(d.weight)}`).join(' ')} L 600,200 L 0,200 Z`}
                  fill="url(#weight-gradient)"
                />
                
                {/* Line */}
                <path
                  d={`M 0,${normalizeWeight(weightData[0].weight)} ${weightData.map((d, i) => `L ${(i * 600) / (weightData.length - 1)},${normalizeWeight(d.weight)}`).join(' ')}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                
                {/* Data points */}
                {weightData.map((d, i) => (
                  <g key={i}>
                    <circle
                      cx={(i * 600) / (weightData.length - 1)}
                      cy={normalizeWeight(d.weight)}
                      r="6"
                      fill="#3b82f6"
                      className="hover:r-8 transition-all cursor-pointer"
                    />
                    <circle
                      cx={(i * 600) / (weightData.length - 1)}
                      cy={normalizeWeight(d.weight)}
                      r="3"
                      fill="white"
                    />
                  </g>
                ))}
              </svg>
              
              {/* Month labels */}
              <div className="flex justify-between mt-4 text-sm text-gray-400">
                {weightData.map((d, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span>{d.month}</span>
                    <span className="text-xs text-white font-medium">{d.weight} kg</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Goals */}
        <div className="space-y-6">
          {/* Goal Progress Circles */}
          <Card className="bg-[#191919] border-[#404040]">
            <CardHeader>
              <CardTitle className="text-white text-lg font-normal">Objetivos del Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Entrenamientos Goal */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Entrenamientos</span>
                    <span className="text-sm text-white font-medium">18/20</span>
                  </div>
                  <div className="relative w-full h-4 bg-gray-600/50 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      style={{ width: '90%' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">90% completado</p>
                </div>

                {/* Peso Goal */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Objetivo de Peso</span>
                    <span className="text-sm text-white font-medium">75/72 kg</span>
                  </div>
                  <div className="relative w-full h-4 bg-gray-600/50 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                      style={{ width: '60%' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">60% completado - Faltan 3 kg</p>
                </div>

                {/* Calorías Goal */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Calorías Quemadas</span>
                    <span className="text-sm text-white font-medium">12.4k/15k</span>
                  </div>
                  <div className="relative w-full h-4 bg-gray-600/50 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-green-400 to-yellow-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      style={{ width: '83%' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">83% completado</p>
                </div>

                {/* Circular Progress */}
                <div className="pt-4 border-t border-[#404040]">
                  <p className="text-sm text-gray-400 mb-4">Progreso General</p>
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#404040"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#ff0400"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56 * 0.78} ${2 * Math.PI * 56}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">78%</span>
                        <span className="text-xs text-gray-400">Completado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Weekly Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Asistencia Semanal */}
        <Card className="bg-[#191919] border-[#404040]">
          <CardHeader>
            <CardTitle className="text-white font-normal">Asistencia Semanal</CardTitle>
            <p className="text-sm text-gray-400">Intensidad de entrenamiento</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((day, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 text-sm text-gray-400">{day.day}</div>
                  <div className="flex-1">
                    {day.attended ? (
                      <div className="relative h-8 bg-[#404040] rounded-lg overflow-hidden">
                        <div
                          className="absolute h-full rounded-lg transition-all duration-500"
                          style={{
                            width: `${day.intensity}%`,
                            background: `linear-gradient(90deg, ${day.intensity > 90 ? '#10b981' : day.intensity > 80 ? '#3b82f6' : '#f59e0b'}, ${day.intensity > 90 ? '#059669' : day.intensity > 80 ? '#2563eb' : '#d97706'})`,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{day.intensity}% intensidad</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-8 bg-[#404040]/30 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-600">Descanso</span>
                      </div>
                    )}
                  </div>
                  <div className="w-16 text-right">
                    {day.attended ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                        ✓ Asistió
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-500">
                        - Faltó
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calorías por Día */}
        <Card className="bg-[#191919] border-[#404040]">
          <CardHeader>
            <CardTitle className="text-white font-normal">Calorías Quemadas</CardTitle>
            <p className="text-sm text-gray-400">Última semana</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative flex items-end justify-around gap-2 px-4">
              {caloriesData.map((calories, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full group">
                    {calories > 0 ? (
                      <>
                        <div
                          className="w-full rounded-t-xl transition-all duration-500 hover:opacity-80 cursor-pointer"
                          style={{
                            height: `${(calories / Math.max(...caloriesData)) * 200}px`,
                            background: 'linear-gradient(180deg, #f59e0b, #ef4444)',
                          }}
                        />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#404040] px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                          {calories} kcal
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-8 rounded-t-xl bg-[#404040]/30" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{attendanceData[i].day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
