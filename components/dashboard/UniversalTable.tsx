"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function UniversalTable({ formType }: { formType: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [totalPages, setTotalPages] = useState(1);

  // FIXED column map based on your admin sidebar keys
  const columnMap: Record<string, string[]> = {
    "contact": [
      "firstName",
      "lastName",
      "email",
      "phone",
      "services",
      "message",
      "createdAt",
    ],
    "project": [
      "fullName",
      "email",
      "phone",
      "projectType",
      "estimatedBudget",
      "timeline",
      "createdAt",
    ],
    "service": [
      "name",
      "email",
      "message",
      "packageName",
      "packagePrice",
      "createdAt",
    ],
    "newsletter": [
      "email",
      "createdAt",
    ]
  };

  const readableLabels: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    fullName: "Full Name",
    name: "Name",
    email: "Email",
    phone: "Phone",
    services: "Service",
    message: "Message",
    projectType: "Project Type",
    estimatedBudget: "Budget",
    timeline: "Timeline",
    packageName: "Package Name",
    packagePrice: "Price",
    createdAt: "Submitted On",
  };

  const convertRow = (row: any) => {
    // Custom transformation for 'service' inquiries
    if (formType === "service" && row.package) {
      row.packageName = row.package.name;
      row.packagePrice = row.package.price;
    }
    return row;
  };

  // Fetch API
  const fetchData = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      type: formType,
      page: String(page),
      limit: String(limit),
      order,
    });

    // Append search parameter only if it's not empty
    if (search.trim()) params.append("search", search.trim());

    try {
      // Simulate API call to /api/enquiry
      const res = await fetch(`/api/enquiry?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch data");

      const result = await res.json();
      console.log(result);
      // Apply row transformation (e.g., extracting package info)
      const transformed = result?.data.map((i: any) => convertRow(i));

      setData(transformed);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset page to 1 when formType or search changes
    setPage(1);
  }, [formType, search]);

  useEffect(() => {
    fetchData();
  }, [formType, search, order, page]);

  const columns = columnMap[formType] || [];
  console.log(data)

  return (
    <div className="bg-white border border-box-border rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold capitalize mb-6">
        {formType.replace("-", " ")} Data
      </h2>

      {/* Filters */}
      <div className="flex flex-row items-center gap-4 mb-6">
        <div className="flex-3 w-full">
          <Input
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              // setPage is handled by the useEffect above
            }}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
          />
        </div>

        <Select
          value={order}
          onValueChange={(value: "asc" | "desc") => setOrder(value)}
        >
          <SelectTrigger className="w-full flex-1 md:w-48 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary">
            <SelectValue placeholder="Sort by Date" />
          </SelectTrigger>

          <SelectContent className="w-full bg-white">
            <SelectItem value="asc">Oldest First</SelectItem>
            <SelectItem value="desc">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* TABLE - Wrapped for horizontal scroll */}
      <div className="border border-gray-300 shadow-sm overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 px-3">
              {columns.map((col) => (
                <TableHead key={col} className="whitespace-nowrap">
                  {readableLabels[col]}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center p-8 animate-pulse border-gray-300"
                >
                  Loading data...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center p-8">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, idx) => (
                <TableRow key={idx} className="border-gray-300 hover:bg-gray-50">
                  {columns.map((col) => (
                    <TableCell key={col} className="border-gray-300">
                      {
                        ["createdAt"].includes(col)
                          ? formatDate(row[col])
                          : row[col] || "---"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>


      {/* PAGINATION */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}
                className={page === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              />
            </PaginationItem>

            <PaginationItem>
              <span className="px-4 py-2 border rounded-full bg-blue-50 text-blue-700 font-medium">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (page < totalPages) setPage(page + 1);
                }}
                className={
                  page === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}



const formatDate = (value: any) => {
  if (!value) return "---";
  try {
    return format(new Date(value), "dd MMM yyyy, hh:mm a");
  } catch {
    return value;
  }
};