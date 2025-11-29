// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Eye,
  User,
  ArrowRight
} from 'lucide-react';
import { formatDate } from '@/lib/utils/formateDate';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  bannerImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    email: string;
    profileImage?: string;
  };
  readingTime: number;
  views: number;
  publishedAt: string;
  createdAt: string;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs?limit=6&status=Published');

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
      } else {
        setError(data.message || 'Failed to load blogs');
      }
    } catch (err) {
      setError('Error fetching blogs');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchBlogs}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing articles, tutorials, and insights on various topics.
          </p>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Blogs</h2>
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Blogs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// Blog Card Component
export function BlogCard({ key, blog }: { key: string, blog: Blog }) {
  return (
    <article key={key} className=" bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
      {/* Blog Image */}
      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
        {blog.bannerImage ? (
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="p-6">
        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/blogs/${blog.slug}`}>
            {blog.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.shortDescription}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex flex-col gap-2">
            {/* Author */}
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author.name}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {/* Reading Time */}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readingTime} min</span>
            </div>

            {/* Views */}
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{blog.views}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}