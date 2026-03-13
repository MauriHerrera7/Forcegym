'use client';

import { useDashboardNavigation } from '@/providers/DashboardNavigationProvider';
import ClientDashboardHome from '@/components/client/views/ClientDashboardHome';

// Import existing page components
import ClientProfile from './profile/page';
import ClientMembershipsPage from './memberships/page';
import TrainingPage from './training/page';
import RoutinesPage from './routines/page';
import ClientSupportPage from './support/page';

export default function ClientDashboard() {
  const { currentView } = useDashboardNavigation();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <ClientDashboardHome />;
      case 'profile':
        return <ClientProfile />;
      case 'memberships':
        return <ClientMembershipsPage />;
      case 'training':
        return <TrainingPage />;
      case 'routines':
        return <RoutinesPage />;
      case 'support':
        return <ClientSupportPage />;
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
