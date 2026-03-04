import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarProvider } from '@/providers/SidebarProvider';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#0A0A0A]">
        <div className="hidden md:block w-64 shrink-0">
          <Sidebar role="client" />
        </div>
        <div className="md:hidden">
          <Sidebar role="client" />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 text-white">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
