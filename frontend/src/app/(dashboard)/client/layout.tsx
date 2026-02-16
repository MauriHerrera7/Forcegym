import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock user data - replace with actual auth
  const user = {
    name: 'Cliente Usuario',
    email: 'cliente@forcegym.com',
    photo: undefined,
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar role="client" />
      <div className="flex flex-1 flex-col">
        <DashboardHeader user={user} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
