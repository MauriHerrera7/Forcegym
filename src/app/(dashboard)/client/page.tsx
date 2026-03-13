'use client';

import { Dumbbell, Flame, Clock, Calendar, Target, TrendingDown, TrendingUp, Scale } from 'lucide-react';
import { ProgressTab } from '@/components/dashboard/ProgressTab';
import { useClientDashboard } from '@/hooks/useClientDashboard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AttendanceCalendar } from '@/components/dashboard/AttendanceCalendar';
import { WeightProgressChart } from '@/components/dashboard/WeightProgressChart';
import { RoutineOverview } from '@/components/dashboard/RoutineOverview';
import { MembershipStatus } from '@/components/dashboard/MembershipStatus';

export default function ClientDashboard() {
  const { data, loading, error, toggleAttendance } = useClientDashboard();

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 font-bold">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const weightTrend = data?.weight_progress && data.weight_progress.length > 1
    ? (data.weight_progress[data.weight_progress.length - 1].weight - data.weight_progress[data.weight_progress.length - 2].weight).toFixed(1)
    : '0';

  const TrendIcon = parseFloat(weightTrend) <= 0 ? TrendingDown : TrendingUp;
  const trendColor = parseFloat(weightTrend) <= 0 ? '#10b981' : '#ef4444';

  return (
    <div className="space-y-6 p-4 md:p-6 font-primary max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Mi Dashboard</h1>
          <p className="text-sm md:text-base text-gray-400">Seguimiento de tu progreso real</p>
        </div>
      </div>

      <div className="space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Peso Actual"
              value={data?.quick_metrics.current_weight ? `${data.quick_metrics.current_weight} kg` : '--'}
              icon={Scale}
              trend={`${weightTrend} kg`}
              subtitle="vs. anterior"
              color="#3b82f6"
              loading={loading}
            />
            <MetricCard
              title="Racha (Días)"
              value={data?.quick_metrics.streak ?? 0}
              icon={Flame}
              trend="Fuego"
              subtitle="Días seguidos"
              color="#f59e0b"
              loading={loading}
            />
            <MetricCard
              title="Entrenamientos"
              value={data?.quick_metrics.workouts_this_week ?? 0}
              icon={Calendar}
              trend="Este mes"
              subtitle="Sesiones"
              color="#10b981"
              loading={loading}
            />
            <MetricCard
              title="Rutinas"
              value={data?.quick_metrics.completed_routines ?? 0}
              icon={Target}
              trend="Completadas"
              subtitle="Total"
              color="#8b5cf6"
              loading={loading}
            />
          </div>

          {/* Main Context: Weight & Attendance */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <WeightProgressChart 
                data={data?.weight_progress || []}
                goalType={data?.weight_goal_type || 'MAINTAIN'}
                loading={loading}
              />
              <AttendanceCalendar 
                attendance={data?.monthly_attendance || []}
                onToggle={toggleAttendance}
              />
            </div>

            {/* Right Column: Status & Routine */}
            <div className="space-y-6">
              <MembershipStatus 
                membership={data?.membership || null}
                alert={data?.membership_status_alert || false}
                loading={loading}
              />
              
              <RoutineOverview 
                routine={data?.weekly_routine || null}
                loading={loading}
              />

              {/* Quick Progress Indicator */}
              {data && (
                <div className="bg-[#191919] border border-[#404040] rounded-xl p-6 flex flex-col items-center justify-center gap-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="#262626"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="#ef4444"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 58 * 0.45} ${2 * Math.PI * 58}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white">45%</span>
                      <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Meta Mensual</span>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-400">
                    ¡Vas por buen camino! Has completado <span className="text-white font-bold">{data.quick_metrics.workouts_this_week}</span> entrenamientos este mes.
                  </p>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Legacy Progress Tab (Load Progress) */}
      <div className="pt-10 border-t border-[#404040]">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">Seguimiento de Cargas</h2>
          <p className="text-sm text-gray-400">Registra y visualiza el progreso de tus ejercicios</p>
        </div>
        <ProgressTab />
      </div>
    </div>
  );
}
