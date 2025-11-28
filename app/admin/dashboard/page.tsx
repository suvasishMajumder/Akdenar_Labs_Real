"use client";

import BlogAdminPage from "@/components/dashboard/blog/Blog";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import SettingsPage from "@/components/dashboard/SettingsPage";
import UniversalTable from "@/components/dashboard/UniversalTable";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const tab = useSearchParams().get("tab") || "dashboard";

  return (
    <div>
      {tab === "dashboard" ? (
        <DashboardOverview />
      ) : tab === "settings" ? <SettingsPage /> :
        tab === "blog" ? <BlogAdminPage /> :
          <UniversalTable formType={tab} />
      }
    </div>
  );
}
