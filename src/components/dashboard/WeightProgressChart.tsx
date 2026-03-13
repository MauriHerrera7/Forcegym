'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeightProgressChartProps {
  data: { date: string; weight: number }[];
  goalType: 'LOSE' | 'GAIN' | 'MAINTAIN';
  loading?: boolean;
}

export function WeightProgressChart({ data, goalType, loading }: WeightProgressChartProps) {
  if (loading) {
    return (
      <Card className="bg-[#191919] border-[#404040] animate-pulse">
        <div className="h-64" />
      </Card>
    );
  }

  // Safety check for empty data
  if (!data || data.length === 0) {
    return (
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white font-normal">Progreso de Peso</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-gray-500">
          No hay registros de peso aún.
        </CardContent>
      </Card>
    );
  }

  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const weights = sortedData.map(d => d.weight);
  const maxWeight = Math.max(...weights);
  const minWeight = Math.min(...weights);
  const range = maxWeight - minWeight === 0 ? 10 : maxWeight - minWeight;
  
  const normalizeWeight = (weight: number) => {
    return 140 - ((weight - minWeight) / range) * 100;
  };

  const getDayLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  const points = sortedData.map((d, i) => {
    const x = (i * 540) / (sortedData.length - 1 || 1) + 30;
    const y = normalizeWeight(d.weight);
    return { x, y, weight: d.weight, date: d.date };
  });

  const pathD = points.length > 1 
    ? `M ${points[0].x},${points[0].y} ` + points.slice(1).map(p => `L ${p.x},${p.y}`).join(' ')
    : '';

  const areaD = points.length > 1
    ? `${pathD} L ${points[points.length - 1].x},180 L ${points[0].x},180 Z`
    : '';

  return (
    <Card className="bg-[#191919] border-[#404040]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white font-normal">Progreso de Peso</CardTitle>
          <p className="text-xs text-gray-500 mt-1">
            Objetivo: {goalType === 'LOSE' ? 'Bajar' : goalType === 'GAIN' ? 'Subir' : 'Mantener'}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48 relative">
          <svg className="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="weight-chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1="30"
                y1={40 + i * 50}
                x2="570"
                y2={40 + i * 50}
                stroke="#404040"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))}
            
            {points.length > 1 && (
              <>
                <path d={areaD} fill="url(#weight-chart-gradient)" />
                <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="3" />
              </>
            )}
            
            {points.map((p, i) => (
              <g key={i} className="group cursor-pointer">
                <circle cx={p.x} cy={p.y} r="6" fill="#191919" stroke="#3b82f6" strokeWidth="2" />
                <text 
                  x={p.x} 
                  y={p.y - 10} 
                  textAnchor="middle" 
                  className="text-[10px] fill-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {p.weight}kg
                </text>
              </g>
            ))}
          </svg>
          
          <div className="flex justify-between px-6 mt-2">
            {points.map((p, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500">{getDayLabel(p.date)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
