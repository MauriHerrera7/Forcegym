'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on dashboard routes (admin and client), auth routes
  const hiddenRoutes = ['/admin', '/client', '/auth/login', '/auth/register'];
  const shouldHideNavbar = hiddenRoutes.some(route => pathname?.startsWith(route));
  
  if (shouldHideNavbar) {
    return null;
  }
  
  return <Navbar />;
}
