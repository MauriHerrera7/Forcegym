'use client';

import { useDashboardNavigation } from '@/providers/DashboardNavigationProvider';
import { useAuthContext } from '@/providers/AuthProvider';
import { MembershipStatus } from '@/components/dashboard/MembershipStatus';
import ClientDashboardHome from '@/components/client/views/ClientDashboardHome';

export default function ClientDashboard() {
  const { user, loading: authLoading } = useAuthContext();
  const { currentView } = useDashboardNavigation();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <ClientDashboardHome />;
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
             <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8 border-b border-[#333] pb-4">Mi Perfil</h2>
             {/* Profile display logic */}
             <div className="bg-[#191919] border border-[#333] rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 rounded-full bg-apple-red flex items-center justify-center text-4xl font-bold">
                      {user?.first_name?.[0]}{user?.last_name?.[0]}
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold text-white">{user?.first_name} {user?.last_name}</h3>
                      <p className="text-zinc-500">{user?.email}</p>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                   <div className="space-y-1">
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">DNI</p>
                      <p className="text-white font-medium">{user?.dni || '--'}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Teléfono</p>
                      <p className="text-white font-medium">{user?.phone || '--'}</p>
                   </div>
                </div>
             </div>
          </div>
        );
      case 'memberships':
        return (
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8 border-b border-[#333] pb-4">Membresías</h2>
            <MembershipStatus membership={data?.membership || null} alert={data?.membership_status_alert || false} loading={loading} />
          </div>
        );
      case 'support':
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-20">
            <h2 className="text-2xl font-black italic uppercase italic tracking-widest mb-4">Soporte</h2>
            <p>Contenido en desarrollo...</p>
          </div>
        );
      default:
        return <ClientDashboardHome />;
    }
  };

  return (
    <div className="min-h-full">
      {renderView()}
    </div>
  );
}
