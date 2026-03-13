import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarProvider } from '@/providers/SidebarProvider';
import { DashboardNavigationProvider } from '@/providers/DashboardNavigationProvider';
import { Suspense } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense>
        <DashboardNavigationProvider>
          <div className="flex min-h-screen bg-[#0A0A0A]">
            <Sidebar role="client" />
            <div className="flex flex-1 flex-col">
              <DashboardHeader />
              <main className="flex-1 overflow-y-auto p-4 md:p-8 text-white">
                {children}
              </main>
            </div>
          </div>
        </DashboardNavigationProvider>
      </Suspense>
    </SidebarProvider>
  );
}
