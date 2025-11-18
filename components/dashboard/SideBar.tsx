"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  Layers,
  Zap,
  Contact,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";

  const menu = [
    { name: "Dashboard", key: "dashboard", icon: LayoutDashboard },
    { name: "Contact Forms", key: "contact", icon: Contact },
    { name: "Service Inquiry", key: "service", icon: Layers },
    { name: "Project Inquiry", key: "project", icon: FileText },
    { name: "Newsletter", key: "newsletter", icon: Mail },
  ];

  const goTo = (key: string) => {
    router.push(`/admin/dashboard?tab=${key}`);
    closeSidebar();
  };


  let name = "Nitish"
  return (
    <>

      {/* Desktop Sidebar */}
      <div className="hidden min-h-[calc(100vh-64px)]  md:block w-64 bg-white border-r border-box-border shadow-sm">
        <div className="px-6 py-3 border-b border-box-border">
          <h2 className="text-2xl font-bold text-gray-800">Hii, Admin {name}</h2>
        </div>

        <ul className="p-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.key}
                onClick={() => goTo(item.key)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition
                ${currentTab === item.key
                    ? "bg-[#7F56D9] text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                  }
              `}
              >
                <Icon size={18} />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <motion.div
          initial={{ x: -260 }}
          animate={{ x: 0 }}
          exit={{ x: -260 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Admin</h2>

            <button onClick={closeSidebar} className="p-2">
              <X size={22} />
            </button>
          </div>

          <ul className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.key}
                  onClick={() => goTo(item.key)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition
                    ${currentTab === item.key
                      ? "bg-[#7F56D9] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.name}
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}

      {/* Black Overlay */}
      {isOpen && (
        <div
          onClick={() => toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}
    </>
  );
}
