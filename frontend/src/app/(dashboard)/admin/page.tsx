'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, Activity, UserPlus, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const metrics = [
    {
      title: 'Total Usuarios',
      value: '2,845',
      icon: Users,
      trend: '+12.5%',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Ingresos',
      value: '$45,231',
      icon: DollarSign,
      trend: '+18.2%',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Crecimiento',
      value: '85%',
      icon: TrendingUp,
      trend: '+5.1%',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Activos Hoy',
      value: '234',
      icon: Activity,
      trend: '+23 nuevos',
      color: 'from-red-500 to-red-600',
    },
  ];

  const recentUsers = [
    { name: 'Juan Pérez', email: 'juan@example.com', status: 'Activo', date: 'Hoy' },
    { name: 'María García', email: 'maria@example.com', status: 'Activo', date: 'Ayer' },
    { name: 'Carlos López', email: 'carlos@example.com', status: 'Inactivo', date: 'Hace 2 días' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Admin</h1>
        <p className="text-gray-400">Panel de control y estadísticas del gimnasio</p>
      </div>

      {/* Metrics Grid with Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="bg-[#191919] border-[#404040] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-gray-400">
                    {metric.title}
                  </CardTitle>
                  <Icon className="h-6 w-6 text-[#ff0400]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-semibold text-white mb-2">{metric.value}</div>
                <p className="text-sm text-green-400">{metric.trend}</p>
                
                {/* Mini Chart */}
                <div className="mt-4 h-16 relative">
                  <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`admin-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ff0400" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ff0400" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 0,${45 - index * 5} L 20,${40 - index * 3} L 40,${35 - index * 2} L 60,${42 - index * 4} L 80,${30 - index} L 100,${35 - index * 2} L 120,${25 - index} L 140,${30 - index * 3} L 160,${20 + index} L 180,${25 - index * 2} L 200,${15 + index} L 200,60 L 0,60 Z`}
                      fill={`url(#admin-gradient-${index})`}
                    />
                    <path
                      d={`M 0,${45 - index * 5} L 20,${40 - index * 3} L 40,${35 - index * 2} L 60,${42 - index * 4} L 80,${30 - index} L 100,${35 - index * 2} L 120,${25 - index} L 140,${30 - index * 3} L 160,${20 + index} L 180,${25 - index * 2} L 200,${15 + index}`}
                      fill="none"
                      stroke="#ff0400"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="bg-[#191919] border-[#404040] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white text-2xl font-normal">Ingresos Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="admin-gradient-main" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff0400" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff0400" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                
                <path
                  d="M 0,140 L 50,130 L 100,110 L 150,125 L 200,95 L 250,105 L 300,80 L 350,90 L 400,70 L 450,80 L 500,60 L 550,70 L 600,50 L 600,200 L 0,200 Z"
                  fill="url(#admin-gradient-main)"
                />
                <path
                  d="M 0,140 L 50,130 L 100,110 L 150,125 L 200,95 L 250,105 L 300,80 L 350,90 L 400,70 L 450,80 L 500,60 L 550,70 L 600,50"
                  fill="none"
                  stroke="#ff0400"
                  strokeWidth="3"
                />
                
                {/* Data points */}
                {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600].map((x, i) => {
                  const y = [140, 130, 110, 125, 95, 105, 80, 90, 70, 80, 60, 70, 50][i];
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#ff0400"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                  );
                })}
              </svg>
              
              {/* Month labels */}
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <span>Ene</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Abr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Membership Distribution */}
          <Card className="bg-[#191919] border-[#404040]">
            <CardHeader>
              <CardTitle className="text-white text-lg font-normal">Distribución</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-6">
                {/* Donut Chart */}
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="#404040"
                      strokeWidth="16"
                      fill="none"
                    />
                    {/* Premium - 45% */}
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="#ff0400"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 52 * 0.45} ${2 * Math.PI * 52}`}
                      strokeLinecap="round"
                    />
                    {/* Standard - 35% */}
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="#3b82f6"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 52 * 0.35} ${2 * Math.PI * 52}`}
                      strokeDashoffset={`${-2 * Math.PI * 52 * 0.45}`}
                      strokeLinecap="round"
                    />
                    {/* Basic - 20% */}
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="#8b5cf6"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 52 * 0.20} ${2 * Math.PI * 52}`}
                      strokeDashoffset={`${-2 * Math.PI * 52 * 0.80}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-semibold text-white">100%</div>
                        <div className="text-xs text-gray-400">Total</div>
                      </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff0400]"></div>
                    <span className="text-gray-400">Premium</span>
                  </div>
                  <span className="text-white font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-400">Standard</span>
                  </div>
                  <span className="text-white font-medium">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-gray-400">Básico</span>
                  </div>
                  <span className="text-white font-medium">20%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-[#191919] border-[#404040]">
            <CardHeader>
              <CardTitle className="text-white text-lg font-normal">Actividad Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: 'Lun', value: 85, gradient: 'linear-gradient(90deg, #ef4444, #dc2626)' }, // Red
                  { day: 'Mar', value: 92, gradient: 'linear-gradient(90deg, #f97316, #ea580c)' }, // Orange
                  { day: 'Mié', value: 78, gradient: 'linear-gradient(90deg, #eab308, #ca8a04)' }, // Yellow
                  { day: 'Jue', value: 88, gradient: 'linear-gradient(90deg, #22c55e, #16a34a)' }, // Green
                  { day: 'Vie', value: 95, gradient: 'linear-gradient(90deg, #06b6d4, #0891b2)' }, // Cyan
                  { day: 'Sáb', value: 70, gradient: 'linear-gradient(90deg, #3b82f6, #2563eb)' }, // Blue
                  { day: 'Dom', value: 65, gradient: 'linear-gradient(90deg, #a855f7, #9333ea)' }, // Purple
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-8">{item.day}</span>
                    <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                        style={{ 
                          width: `${item.value}%`,
                          background: item.gradient 
                        }}
                      />
                    </div>
                    <span className="text-xs text-white w-10 text-right font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Users Table */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-normal">Usuarios Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-[#404040]/20 hover:bg-[#404040]/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ff0400] flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Activo'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {user.status}
                  </span>
                  <span className="text-sm text-gray-500">{user.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
