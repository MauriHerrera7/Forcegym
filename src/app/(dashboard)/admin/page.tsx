'use client';

import { useDashboardNavigation } from '@/providers/DashboardNavigationProvider';
import AdminDashboardHome from '@/components/admin/views/AdminDashboardHome';

// Import existing route page components
import AdminUsersPage from './users/page';
import AdminPaymentsPage from './payments/page';
import AdminRenewalsPage from './renewals/page';
import AdminProfile from './profile/page';

export default function AdminDashboard() {
  const { currentView } = useDashboardNavigation();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboardHome />;
      case 'users':
        return <AdminUsersPage />;
      case 'payments':
        return <AdminPaymentsPage />;
      case 'renewals':
        return <AdminRenewalsPage />;
      case 'profile':
        return <AdminProfile />;
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
