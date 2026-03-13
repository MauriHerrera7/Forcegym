'use client';

import { useDashboardNavigation } from '@/providers/DashboardNavigationProvider';
import ClientDashboardHome from '@/components/client/views/ClientDashboardHome';

export default function ClientDashboard() {
  const { currentView } = useDashboardNavigation();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <ClientDashboardHome />;
      case 'profile':
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-20">
            <h2 className="text-2xl font-black italic uppercase italic tracking-widest mb-4">Mi Perfil</h2>
            <p>Contenido en desarrollo...</p>
          </div>
        );
      case 'training':
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-20">
            <h2 className="text-2xl font-black italic uppercase italic tracking-widest mb-4">Entrenamiento</h2>
            <p>Contenido en desarrollo...</p>
          </div>
        );
      case 'routines':
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-20">
            <h2 className="text-2xl font-black italic uppercase italic tracking-widest mb-4">Mis Rutinas</h2>
            <p>Contenido en desarrollo...</p>
          </div>
        );
      case 'memberships':
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-20">
            <h2 className="text-2xl font-black italic uppercase italic tracking-widest mb-4">Membresías</h2>
            <p>Contenido en desarrollo...</p>
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
