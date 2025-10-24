import { Sidebar } from '@/components/dashboard/sidebar';
import { ChatWidget } from '@/components/dashboard/chat-widget';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
          {children}
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
