"use client";

import { useSidebar } from "@/context/SidebarContext";
import { LogOut, Menu, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-box-border shadow-sm h-16">
      <div className="flex items-center gap-2">
        <button
          className="md:hidden z-50 bg-white shadow-md p-2 rounded-md"
          onClick={toggleSidebar}
        >
          <MenuIcon size={20} />
        </button>
        <h1 className=" text-lg md:text-xl font-semibold text-gray-700">Admin Dashboard</h1>

      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-50 text-red-600 text-sm md:text-md px-3 md:px-4 py-2 rounded-lg hover:bg-red-100"
      >
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
}
