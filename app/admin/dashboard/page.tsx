"use client";

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
      ) : tab === "settings" ? <SettingsPage /> : (
        <UniversalTable formType={tab} />
      )}
    </div>
  );
}
