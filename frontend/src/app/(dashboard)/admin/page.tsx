'use client';

import { useState, useEffect } from 'react';
import { useAdmin, AdminUser } from '@/hooks/useAdmin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, Activity, UserPlus, Calendar, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AdminDashboard() {
  const { getGymMetrics, getRecentUsers, getMetricsHistory, loading } = useAdmin();
  const [metricsData, setMetricsData] = useState<any>(null);
  const [recentUsersData, setRecentUsersData] = useState<AdminUser[]>([]);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const [metrics, users, history] = await Promise.all([
        getGymMetrics(),
        getRecentUsers(),
        getMetricsHistory(30) // Últimos 30 días para los gráficos
      ]);
      setMetricsData(metrics);
      setRecentUsersData(users);
      
      // Asegurarnos de que el historial esté ordenado por fecha
      const sortedHistory = [...(history || [])].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setHistoryData(sortedHistory);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const metrics = [
    {
      title: 'Total Usuarios',
      value: metricsData?.total_users?.toString() || '0',
      icon: Users,
      trend: `+${metricsData?.new_members || 0} nuevos`,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Ventas del Mes',
      value: `$${metricsData?.total_revenue || '0.00'}`,
      icon: DollarSign,
      trend: 'Ingresos totales',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Miembros Activos',
      value: metricsData?.active_members?.toString() || '0',
      icon: TrendingUp,
      trend: `${metricsData?.active_memberships || 0} membresías`,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Check-ins Hoy',
      value: metricsData?.total_checkins?.toString() || '0',
      icon: Activity,
      trend: 'Ingresos hoy',
      color: 'from-red-500 to-red-600',
    },
  ];

  const recentUsers = recentUsersData.map(user => ({
    id: user.id,
    name: user.full_name || (user.first_name || user.last_name ? 
      `${user.first_name || ''} ${user.last_name || ''}`.trim() 
      : user.username || 'Usuario'),
    email: user.email,
    status: user.is_active ? 'Activo' : 'Inactivo',
    date: new Date(user.created_at).toLocaleDateString(),
    profile_picture_url: user.profile_picture_url,
    profile_picture: user.profile_picture
  }));

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            Dashboard Admin
            {isRefreshing && <Loader2 className="h-6 w-6 animate-spin text-[#ff0400]" />}
          </h1>
          <p className="text-zinc-500 font-medium">
            Panel de control y estadísticas reales del gimnasio
          </p>
        </div>
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
                        <stop offset="100%" stopColor="#ff0400" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {historyData.length > 1 ? (
                      <>
                        <path
                          d={`M ${historyData.slice(-10).map((d, i, arr) => {
                            const x = (i / (arr.length - 1)) * 200;
                            let val = 0;
                            let maxVal = 100;
                            
                            if (index === 0) { val = d.total_active_users || 0; maxVal = Math.max(...historyData.map(h => h.total_active_users || 0), 10); }
                            if (index === 1) { val = parseFloat(d.daily_revenue || 0); maxVal = Math.max(...historyData.map(h => parseFloat(h.daily_revenue || 0)), 100); }
                            if (index === 2) { val = d.active_memberships || 0; maxVal = Math.max(...historyData.map(h => h.active_memberships || 0), 10); }
                            if (index === 3) { val = d.total_checkins || 0; maxVal = Math.max(...historyData.map(h => h.total_checkins || 0), 10); }
                            
                            const y = 50 - (val / maxVal) * 40;
                            return `${i === 0 ? '' : 'L'} ${x},${y}`;
                          }).join(' ')} L 200,60 L 0,60 Z`}
                          fill={`url(#admin-gradient-${index})`}
                        />
                        <path
                          d={`M ${historyData.slice(-10).map((d, i, arr) => {
                            const x = (i / (arr.length - 1)) * 200;
                            let val = 0;
                            let maxVal = 100;
                            
                            if (index === 0) { val = d.total_active_users || 0; maxVal = Math.max(...historyData.map(h => h.total_active_users || 0), 10); }
                            if (index === 1) { val = parseFloat(d.daily_revenue || 0); maxVal = Math.max(...historyData.map(h => parseFloat(h.daily_revenue || 0)), 100); }
                            if (index === 2) { val = d.active_memberships || 0; maxVal = Math.max(...historyData.map(h => h.active_memberships || 0), 10); }
                            if (index === 3) { val = d.total_checkins || 0; maxVal = Math.max(...historyData.map(h => h.total_checkins || 0), 10); }
                            
                            const y = 50 - (val / maxVal) * 40;
                            return `${i === 0 ? '' : 'L'} ${x},${y}`;
                          }).join(' ')}`}
                          fill="none"
                          stroke="#ff0400"
                          strokeWidth="2"
                        />
                      </>
                    ) : (
                      <path
                        d="M 0,40 L 40,35 L 80,45 L 120,30 L 160,35 L 200,25"
                        fill="none"
                        stroke="#2a2a2a"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    )}
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
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="admin-gradient-main" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff0400" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff0400" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {historyData.length > 1 ? (
                  <>
                    <path
                      d={`M ${historyData.map((d, i) => {
                        const x = (i / (historyData.length - 1)) * 600;
                        const maxRev = Math.max(...historyData.map(h => parseFloat(h.daily_revenue || 0)), 100);
                        const y = 160 - (parseFloat(d.daily_revenue || 0) / maxRev) * 120;
                        return `${i === 0 ? '' : 'L'} ${x},${y}`;
                      }).join(' ')} L 600,200 L 0,200 Z`}
                      fill="url(#admin-gradient-main)"
                    />
                    <path
                      d={`M ${historyData.map((d, i) => {
                        const x = (i / (historyData.length - 1)) * 600;
                        const maxRev = Math.max(...historyData.map(h => parseFloat(h.daily_revenue || 0)), 100);
                        const y = 160 - (parseFloat(d.daily_revenue || 0) / maxRev) * 120;
                        return `${i === 0 ? '' : 'L'} ${x},${y}`;
                      }).join(' ')}`}
                      fill="none"
                      stroke="#ff0400"
                      strokeWidth="3"
                    />
                    {historyData.map((d, i) => {
                      const x = (i / (historyData.length - 1)) * 600;
                      const maxRev = Math.max(...historyData.map(h => parseFloat(h.daily_revenue || 0)), 100);
                      const y = 160 - (parseFloat(d.daily_revenue || 0) / maxRev) * 120;
                      return (
                        <circle key={i} cx={x} cy={y} r="4" fill="#ff0400" />
                      );
                    })}
                  </>
                ) : (
                  <text x="300" y="100" textAnchor="middle" fill="#525252" className="text-sm italic font-bold uppercase tracking-widest">Esperando datos históricos...</text>
                )}
              </svg>
              
              <div className="flex justify-between mt-4 text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
                {historyData.length > 1 ? (
                  <>
                    <span>{new Date(historyData[0].date).toLocaleDateString('es', { month: 'short', day: 'numeric' })}</span>
                    <span>Hoy</span>
                  </>
                ) : (
                  <span className="w-full text-center">Datos reales sincronizados con el sistema</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Membership Distribution */}
          <Card className="bg-[#191919] border-[#404040]">
            <CardHeader>
              <CardTitle className="text-white text-lg font-normal">Estado de Membresías</CardTitle>
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
                    {/* Active Memberships Percent */}
                    {metricsData?.total_users > 0 && (
                      <circle
                        cx="64"
                        cy="64"
                        r="52"
                        stroke="#ff0400"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 52 * (metricsData.active_memberships / metricsData.total_users)} ${2 * Math.PI * 52}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    )}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-black text-white">
                          {metricsData?.total_users > 0 
                            ? Math.round((metricsData.active_memberships / metricsData.total_users) * 100)
                            : 0}%
                        </div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Activas</div>
                      </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff0400] shadow-[0_0_8px_#ff0400]"></div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Activos</span>
                  </div>
                  <span className="text-xs text-white font-black italic">{metricsData?.active_memberships || 0}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sin Plan</span>
                  </div>
                  <span className="text-xs text-white font-black italic">
                    {(metricsData?.total_users || 0) - (metricsData?.active_memberships || 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-[#191919] border-[#404040]">
            <CardHeader>
              <CardTitle className="text-white text-lg font-normal">Asistencia 7 Días</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(historyData.length > 0 ? historyData.slice(-7) : [
                  { date: '?', total_checkins: 0 },
                  { date: '?', total_checkins: 0 },
                  { date: '?', total_checkins: 0 },
                  { date: '?', total_checkins: 0 },
                  { date: '?', total_checkins: 0 },
                  { date: '?', total_checkins: 0 },
                  { date: '?', total_checkins: 0 },
                ]).map((item, i) => {
                  const maxVal = Math.max(...historyData.map(h => h.total_checkins || 0), 1);
                  const percentage = Math.min(((item.total_checkins || 0) / maxVal) * 100, 100);
                  const dateObj = new Date(item.date);
                  const dayName = isNaN(dateObj.getTime()) ? item.date : dateObj.toLocaleDateString('es', { weekday: 'short' });
                  
                  const gradients = [
                    'linear-gradient(90deg, #ef4444, #dc2626)',
                    'linear-gradient(90deg, #f97316, #ea580c)',
                    'linear-gradient(90deg, #eab308, #ca8a04)',
                    'linear-gradient(90deg, #22c55e, #16a34a)',
                    'linear-gradient(90deg, #06b6d4, #0891b2)',
                    'linear-gradient(90deg, #3b82f6, #2563eb)',
                    'linear-gradient(90deg, #a855f7, #9333ea)',
                  ];

                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-gray-500 w-8 uppercase">{dayName}</span>
                      <div className="flex-1 h-6 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#404040]/30">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${percentage}%`,
                            background: gradients[i % gradients.length]
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-white w-8 text-right font-black italic">{item.total_checkins || 0}</span>
                    </div>
                  );
                })}
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
                className="flex items-center justify-between p-4 rounded-xl bg-[#404040]/10 border border-[#404040]/20 hover:bg-[#404040]/20 hover:border-[#ff0400]/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-[#ff0400] rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                    <Avatar className="h-12 w-12 ring-2 ring-[#404040] group-hover:ring-[#ff0400]/50 transition-all">
                      <AvatarImage src={user.profile_picture_url || user.profile_picture} />
                      <AvatarFallback className="bg-[#1a1a1a] text-[#ff0400] font-black italic">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-black text-white italic uppercase tracking-tighter">{user.name}</p>
                    <p className="text-xs text-zinc-500 font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1 text-center">Estado</p>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        user.status === 'Activo'
                          ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                          : 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20'
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className="text-right border-l border-[#404040] pl-8">
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Registro</p>
                    <span className="text-xs text-zinc-400 font-bold italic">{user.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
