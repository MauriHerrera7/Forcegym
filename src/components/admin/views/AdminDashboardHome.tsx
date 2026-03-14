'use client';

import { useState, useEffect } from 'react';
import { useAdmin, AdminUser } from '@/hooks/useAdmin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, Activity, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboardHome() {
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
        getMetricsHistory(30)
      ]);
      setMetricsData(metrics);
      setRecentUsersData(users);
      const sortedHistory = [...(history || [])].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setHistoryData(sortedHistory);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const metrics = [
    { title: 'Total Usuarios', value: metricsData?.total_users?.toString() || '0', icon: Users, trend: `+${metricsData?.new_members || 0} nuevos` },
    { title: 'Ventas del Mes', value: `$${metricsData?.total_revenue || '0.00'}`, icon: DollarSign, trend: 'Ingresos totales' },
    { title: 'Miembros Activos', value: metricsData?.active_memberships?.toString() || '0', icon: TrendingUp, trend: 'Membresías vigentes' },
    { title: 'Check-ins Hoy', value: metricsData?.today_checkins?.toString() || '0', icon: Activity, trend: 'Ingresos hoy' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            Dashboard Admin
            {isRefreshing && <Loader2 className="h-6 w-6 animate-spin text-[#ff0400]" />}
          </h1>
          <p className="text-zinc-500 font-medium text-sm md:text-base">Control y estadísticas globales</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="bg-[#191919] border-[#404040] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-black uppercase tracking-widest text-[#ff0400]">{metric.title}</CardTitle>
                  <Icon className="h-5 w-5 text-zinc-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-white mb-1 italic tracking-tighter">{metric.value}</div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{metric.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         <Card className="bg-[#191919] border-[#404040] lg:col-span-2">
           <CardHeader><CardTitle className="text-white text-lg font-normal">Ingresos Recientes</CardTitle></CardHeader>
           <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-[#333] rounded-3xl">
                <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-[10px]">Mapa de Calor de Ingresos</p>
              </div>
           </CardContent>
         </Card>
         <Card className="bg-[#191919] border-[#404040]">
           <CardHeader><CardTitle className="text-white text-lg font-normal">Estado de Membresías</CardTitle></CardHeader>
           <CardContent>
              <div className="flex flex-col items-center justify-center p-8 space-y-6">
                 <div className="w-32 h-32 rounded-full border-8 border-[#ff0400] flex items-center justify-center">
                    <span className="text-3xl font-black text-white italic">
                      {metricsData?.total_users > 0 ? Math.round((metricsData.active_memberships / metricsData.total_users) * 100) : 0}%
                    </span>
                 </div>
                 <div className="text-center">
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">SOCIOS ACTIVOS</p>
                    <p className="text-white font-bold">{metricsData?.active_memberships} de {metricsData?.total_users}</p>
                 </div>
              </div>
           </CardContent>
         </Card>
      </div>

      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader><CardTitle className="text-white text-lg font-normal">Usuarios Registrados Recientemente</CardTitle></CardHeader>
        <CardContent>
           <div className="space-y-4">
              {recentUsersData.slice(0, 5).map((user, i) => (
                <div key={i} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-black/20 border border-[#333]">
                   <div className="flex items-center gap-4 min-w-0">
                      <Avatar className="h-10 w-10 border border-[#333] shrink-0">
                        <AvatarImage src={user.profile_picture_url} />
                        <AvatarFallback className="bg-zinc-800 text-zinc-500">{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-black text-white italic uppercase tracking-tight text-sm truncate">{user.username}</p>
                        <p className="text-[10px] text-zinc-600 truncate">{user.email}</p>
                      </div>
                   </div>
                   <Badge variant="outline" className="border-green-500/20 text-green-500 uppercase text-[10px]">Activo</Badge>
                </div>
              ))}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
