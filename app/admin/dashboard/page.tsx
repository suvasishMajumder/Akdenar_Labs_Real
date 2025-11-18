"use client";

import DashboardOverview from "@/components/dashboard/DashboardOverview";
import UniversalTable from "@/components/dashboard/UniversalTable";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const tab = useSearchParams().get("tab") || "dashboard";

  return (
    <div>
      {tab === "dashboard" ? (
        <DashboardOverview />
      ) : (
        <UniversalTable formType={tab} />
      )}
    </div>
  );
}
