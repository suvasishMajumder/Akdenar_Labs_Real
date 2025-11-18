"use client";

import { useEffect, useState } from "react";
import { BarChart3, Mail, FileText, Layers, Zap } from "lucide-react";

// shadcn/ui table imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // सुनिश्चित करें कि यह आपके shadcn कंपोनेंट्स का सही पथ है।

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    total: 0,
    project: 0,
    service: 0,
    contact: 0,
    newsletter: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    async function fetchDashboardStats() {
      // Simulate API call for demonstration, replace with actual fetch
      let res = await fetch("/api/dashboard-stats");
      let data = await res.json();
      const all = data.recent;
      console.log(data);
      setStats({
        total: all.length,
        project: data.stats.projectInquiry,
        service: data.stats.packageInquiry,
        contact: data.stats.getInTouch,
        newsletter: data.stats.newsLetterCount,
      });

      setRecent(all.slice(0, 5)); // Show latest 5
    }
    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-4 md:space-y-8">
      <p className="text-gray-500">Overview of your website activity</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard
          title="Total Enquiries"
          value={stats.total}
          icon={<BarChart3 className="text-blue-600" size={26} />}
          color="blue"
        />

        <StatCard
          title="Project Inquiries"
          value={stats.project}
          icon={<FileText className="text-purple-600" size={26} />}
          color="purple"
        />

        <StatCard
          title="Service Inquiry"
          value={stats.service}
          icon={<Layers className="text-emerald-600" size={26} />}
          color="green"
        />

        <StatCard
          title="Quick Contacts"
          value={stats.contact}
          icon={<Zap className="text-orange-600" size={26} />}
          color="orange"
        />

        <StatCard
          title="Newsletter"
          value={stats.newsletter}
          icon={<Mail className="text-pink-600" size={26} />}
          color="pink"
        />
      </div>

      {/* Recent Enquiries with shadcn Table and Scroll */}
      <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>

      {/* This div wraps the table to enable horizontal scrolling on overflow */}
      <div className="overflow-auto border-gray-300 border">
        <Table className="min-w-full ">
          <TableHeader>
            <TableRow className="bg-gray-100 px-3">
              <TableHead className="" >Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead >Type</TableHead>
              <TableHead >Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recent.length > 0 ? (
              recent.map((item: any) => (
                <TableRow key={item._id} className="hover:bg-gray-50  border-gray-300  " >
                  <TableCell className="font-medium p-3">
                    {item.fullName || item.name || item.firstName}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="capitalize">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700 whitespace-nowrap">
                      {item.formType.replace("-", " ")}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                  No inquiries yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* ---------------- STAT CARD COMPONENT (unchanged) ---------------- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 border-gray-300 border flex items-center justify-between gap-4">

      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className=" flex justify-center items-center bg-gray-50 size-11 rounded-lg">{icon}</div>
    </div>
  );
}