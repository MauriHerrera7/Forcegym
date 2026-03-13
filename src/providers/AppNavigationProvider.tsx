'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthProvider';

export type AppView = 'landing' | 'login' | 'register' | 'admin' | 'client';

interface AppNavigationContextType {
  currentView: AppView;
  navigateTo: (view: AppView) => void;
}

const AppNavigationContext = createContext<AppNavigationContextType | undefined>(undefined);

export function AppNavigationProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, loading } = useAuthContext();
  const [currentView, setCurrentView] = useState<AppView>('landing');

  // Handle initial state and auth changes
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && user) {
        const roleView = user.role?.toUpperCase() === 'ADMIN' ? 'admin' : 'client';
        setCurrentView(roleView);
      } else {
        // Only reset to landing if we are currently in a protected view
        setCurrentView(prev => (prev === 'admin' || prev === 'client' ? 'landing' : prev));
      }
    }
  }, [isAuthenticated, user, loading]);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <AppNavigationContext.Provider value={{ currentView, navigateTo }}>
      {children}
    </AppNavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(AppNavigationContext);
  if (context === undefined) {
    throw new Error('useAppNavigation must be used within an AppNavigationProvider');
  }
  return context;
}
