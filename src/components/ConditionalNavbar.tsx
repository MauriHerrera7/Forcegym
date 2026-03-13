'use client';

import { usePathname } from 'next/navigation';
import { useAppNavigation } from '@/providers/AppNavigationProvider';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const { currentView } = useAppNavigation();
  
  // Hide navbar on dashboard views, login, and register
  const hideInViews = ['admin', 'client', 'login', 'register'];
  const shouldHideNavbar = hideInViews.includes(currentView);
  
  // Also keep pathname check for deep links that might still exist
  const hiddenRoutes = ['/admin', '/client', '/auth'];
  const shouldHideByPath = hiddenRoutes.some(route => pathname === route || pathname?.startsWith(route + '/'));

  if (shouldHideNavbar || shouldHideByPath) {
    return null;
  }
  
  return <Navbar />;
}
