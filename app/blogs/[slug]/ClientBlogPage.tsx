"use client";

import Footer from "@/components/home/Footer";
import { ArrowLeft, Calendar, Clock, Eye, User } from "lucide-react";
import Link from "next/link";
interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  bannerImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    email: string;
    profileImage?: string;
    bio?: string;
  };
  readingTime: number;
  views: number;
  publishedAt: string;
  createdAt: string;
}
export default function ClientBlogPage({ blog }: { blog: Blog }) {
  return (
    <>
      <div className="min-h-screen bg-white">

        {/* Back Button */}
        <div className="border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>
          </div>
        </div>

        {/* Blog Content */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {blog.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              {/* <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{blog.author?.name}</span>
              </div> */}

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readingTime} min read</span>
              </div>

              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{blog.views} views</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                {blog.category}
              </span>
              {blog.tags?.map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* {blog.bannerImage && (
            <div className="mb-8">
              <img
                src={blog.bannerImage}
                alt={blog.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )} */}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>

      <Footer />
    </>
  );
}
