'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type View = 'dashboard' | 'users' | 'payments' | 'renewals' | 'profile' | 'support' | 'training' | 'routines' | 'memberships';

interface DashboardNavigationContextType {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const DashboardNavigationContext = createContext<DashboardNavigationContextType | undefined>(undefined);

export function DashboardNavigationProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize from query param if exists, otherwise default
  const initialView = (searchParams.get('v') as View) || 'dashboard';
  const [currentView, setView] = useState<View>(initialView);

  const setCurrentView = (view: View) => {
    setView(view);
    // Optional: Sync to query param silently (this keeps the path clean but allows direct links)
    // Using simple view state for now as requested "no se esté viendo la ruta"
  };

  return (
    <DashboardNavigationContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </DashboardNavigationContext.Provider>
  );
}

export function useDashboardNavigation() {
  const context = useContext(DashboardNavigationContext);
  if (context === undefined) {
    throw new Error('useDashboardNavigation must be used within a DashboardNavigationProvider');
  }
  return context;
}

/** Safe version that returns null when outside the provider (no throw) */
export function useDashboardNavigationSafe() {
  return useContext(DashboardNavigationContext) ?? null;
}
