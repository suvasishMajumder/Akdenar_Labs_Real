"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogAdminPage() {
  // STATIC JSON DATA  
  const blogData = [
    {
      _id: "679812ab45df001234a1c101",
      title: "How AI is Transforming the Future of Businesses in 2025",
      slug: "ai-transforming-businesses-2025",
      category: "Artificial Intelligence",
      shortDescription:
        "Discover how AI automation, LLMs, and predictive analytics are reshaping business operations for startups and enterprises.",
      thumbnail:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80",
      banner:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80",
      author: {
        name: "Akdenar Labs Team",
        avatar: "https://i.pravatar.cc/100?img=32",
      },
      tags: ["AI", "Automation", "Business", "LLM", "Tech Trends"],
      status: "published",
      content:
        "<h2>AI in 2025</h2><p>Artificial Intelligence is redefining how businesses operate...</p>",
      createdAt: "2025-01-22T05:30:00.000Z",
      updatedAt: "2025-01-22T05:30:00.000Z",
    },
    {
      _id: "679812ab45df001234a1c102",
      title: "Building Scalable Web Applications with Next.js 15",
      slug: "scalable-apps-nextjs-15",
      category: "Web Development",
      shortDescription:
        "Next.js 15 introduces improved routing, server components, and advanced caching strategies.",
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80",
      banner:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80",
      author: {
        name: "Akdenar Labs Engineering",
        avatar: "https://i.pravatar.cc/100?img=20",
      },
      tags: ["Next.js", "React", "Performance", "DevOps"],
      status: "draft",
      content:
        "<p>Next.js continues to dominate the modern web ecosystem...</p>",
      createdAt: "2025-01-20T10:00:00.000Z",
      updatedAt: "2025-01-20T10:00:00.000Z",
    },
    {
      _id: "679812ab45df001234a1c103",
      title: "Why Your Business Needs a Strong Digital Presence",
      slug: "business-digital-presence",
      category: "Business Strategy",
      shortDescription:
        "A powerful digital presence helps brands scale faster, build trust, and reach new markets.",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80",
      banner:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80",
      author: {
        name: "Akdenar Labs Marketing",
        avatar: "https://i.pravatar.cc/100?img=12",
      },
      tags: ["Branding", "Marketing", "Growth", "SEO"],
      status: "published",
      content:
        "<h2>Digital Growth</h2><p>A strong online presence increases brand credibility...</p>",
      createdAt: "2025-01-18T14:45:00.000Z",
      updatedAt: "2025-01-18T14:45:00.000Z",
    },
  ];

  const [blogs, setBlogs] = useState(blogData);
  const router = useRouter();


  // Delete function  
  const handleDelete = (id: string) => {
    const confirmDel = confirm("Delete this blog?");
    if (!confirmDel) return;

    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-gray-500 text-sm">
            Manage all your blog posts from here.
          </p>
        </div>

        <Button onClick={() => router.push("blog/create")} className="bg-purple-600 hover:bg-purple-700 text-white">
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Blog
        </Button>
      </div>

      {/* BLOG TABLE */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created At</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{blog.title}</td>
                <td className="p-4">{blog.category}</td>

                <td className="p-4">
                  <Badge
                    className={
                      blog.status === "published"
                        ? "bg-green-500"
                        : "bg-yellow-600"
                    }
                  >
                    {blog.status}
                  </Badge>
                </td>

                <td className="p-4">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 flex justify-end gap-3">
                  <Link href={`/admin/dashboard/blog/edit/${blog._id}`}>
                    <Button size="sm" variant="outline">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
