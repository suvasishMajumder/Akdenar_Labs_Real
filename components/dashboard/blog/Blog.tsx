"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

// Mock data for the blogs
const mockBlogs = [
  {
    title: "The Rise of AI in Web Development",
    category: "Artificial Intelligence",
    status: "published",
    createdAt: "2024-07-20",
  },
  {
    title: "Mastering Next.js 14: A Deep Dive",
    category: "Web Development",
    status: "published",
    createdAt: "2024-07-18",
  },
  {
    title: "Effective Business Strategies for Startups",
    category: "Business Strategy",
    status: "draft",
    createdAt: "2024-07-15",
  },
  {
    title: "Serverless Architectures with AWS Lambda",
    category: "Cloud Computing",
    status: "published",
    createdAt: "2024-07-12",
  },
  {
    title: "Exploring the Core Concepts of Machine Learning",
    category: "Artificial Intelligence",
    status: "draft",
    createdAt: "2024-07-10",
  },
];

const uniqueCategories = ["All", ...new Set(mockBlogs.map((blog) => blog.category))];
const uniqueStatuses = ["All", "published", "draft"];

export default function BlogListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState(mockBlogs);
  const router = useRouter();

  useEffect(() => {
    let blogs = mockBlogs;

    // Filter by search term
    if (searchTerm) {
      blogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== "All") {
      blogs = blogs.filter((blog) => blog.category === categoryFilter);
    }

    // Filter by status
    if (statusFilter !== "All") {
      blogs = blogs.filter((blog) => blog.status === statusFilter);
    }

    setFilteredBlogs(blogs);
  }, [searchTerm, categoryFilter, statusFilter]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl  font-bold">Blogs</h1>
        <Button asChild onClick={() => router.push("blog/create")}>
          Create New Blog
        </Button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {uniqueStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/5">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.map((blog) => (
              <TableRow key={blog.title}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>
                  <Badge
                    variant={blog.status === "published" ? "default" : "secondary"}
                  >
                    {blog.status}
                  </Badge>
                </TableCell>
                <TableCell>{blog.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
