import Sidebar from "@/components/dashboard/SideBar";
import Topbar from "@/components/dashboard/Topbar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>

      <div className="min-h-screen bg-gray-50">

        {/* Top Bar */}
        <Topbar />

        {/* Main Layout */}
        <div className="flex">

          {/* Sidebar - Only desktop */}
          <Sidebar />

          {/* Content */}
          <main className="flex-1 p-6 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
