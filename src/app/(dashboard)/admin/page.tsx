'use client';

import { useDashboardNavigation } from '@/providers/DashboardNavigationProvider';
import AdminDashboardHome from '@/components/admin/views/AdminDashboardHome';
import AdminUsersView from '@/components/admin/views/AdminUsersView';
import AdminPaymentsView from '@/components/admin/views/AdminPaymentsView';

export default function AdminDashboard() {
  const { currentView } = useDashboardNavigation();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboardHome />;
      case 'users':
        return <AdminUsersView />;
      case 'payments':
        return <AdminPaymentsView />;
      case 'renewals':
        return (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-20">
            <h2 className="text-2xl font-black italic uppercase italic tracking-widest mb-4">Módulo de Renovaciones</h2>
            <p>Contenido en desarrollo...</p>
          </div>
        );
      default:
        return <AdminDashboardHome />;
    }
  };

  return (
    <div className="min-h-full">
      {renderView()}
    </div>
  );
}
