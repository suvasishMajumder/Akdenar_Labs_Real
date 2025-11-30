// app/blogs/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Eye,
  User,
  Search,
  Filter
} from 'lucide-react';
import { BlogCard } from '@/components/home/BlogSection';
import Footer from '@/components/home/Footer';

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

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [searchQuery, categoryFilter]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      let url = '/api/blogs?status=Published';
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      if (categoryFilter) url += `&category=${encodeURIComponent(categoryFilter)}`;

      const response = await fetch(url);

      if (!response.ok) throw new Error('Failed to fetch blogs');

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
      month: 'short',
      day: 'numeric'
    });
  };

  // Get unique categories for filter
  const categories = [...new Set(blogs.map(blog => blog.category))];

  return (
    <>

      <div className="min-h-screen py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blogs</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our collection of articles and tutorials
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchBlogs}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blogs found.</p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
