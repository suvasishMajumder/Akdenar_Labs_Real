// app/admin/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Folder
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: 'Draft' | 'Published' | 'Scheduled';
  views: number;
  readingTime: number;
  createdAt: string;
  publishedAt?: string;
  author: {
    name: string;
    email: string;
  };
}

interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  scheduledBlogs: number;
  totalViews: number;
  totalReadingTime: number;
  totalAuthors: number;
  totalCategories: number;
}
export default function BlogListingPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchBlogs();
    fetchStats();
  }, [searchQuery, statusFilter]);

  const fetchBlogs = async () => {
    try {
      let url = '/api/blogs?limit=10';

      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/blogs/stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.data.overview);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/admin/blog/edit/${slug}`);
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchBlogs(); // Refresh the list
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleStatusChange = async (blogId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        fetchBlogs(); // Refresh the list
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Published: 'default',
      Draft: 'secondary',
      Scheduled: 'outline',
    };

    const colors = {
      Published: 'bg-green-100 text-green-800 border-green-200',
      Draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
    };

    return (
      <Badge variant="secondary" className={`${colors[status as keyof typeof colors]} border`}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="flex flex-wrap gap-4 mb-8">
        {/* Total Blogs with Breakdown */}
        <div className="flex-1 min-w-[180px] bg-white rounded-lg border p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xl flex gap-1 items-center justify-center">
                <span className='font-bold'>
                  {stats?.totalBlogs || 0}
                </span>
                (

                <div className="flex text-xs font-bold items-center justify-center gap-2 text-gray-600 mt-1">
                  <div className="text-center flex gap-1">
                    <div className="font-semibold text-green-600">{stats?.publishedBlogs || 0}</div>
                    <div className="text-gray-500">P</div>
                  </div>
                  <div className="text-center flex gap-1">
                    <div className="font-semibold text-yellow-600">{stats?.draftBlogs || 0}</div>
                    <div className="text-gray-500">D</div>
                  </div>
                  <div className="text-center flex gap-1">
                    <div className="font-semibold text-blue-600">{stats?.scheduledBlogs || 0}</div>
                    <div className="text-gray-500">S</div>
                  </div>
                </div>
                )
              </div>
              <div className="text-sm text-gray-500">Total Blogs</div>
            </div>
          </div>
        </div>

        {/* Published */}
        <div className="flex-1 min-w-[180px] bg-white rounded-lg border p-4 shadow-sm flex items-center">
          <div className="flex items-center gap-3 w-full">
            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-green-600">{stats?.publishedBlogs || 0}</div>
              <div className="text-sm text-gray-500">Published</div>
            </div>
          </div>
        </div>

        {/* Authors */}
        <div className="flex-1 min-w-[180px] bg-white rounded-lg border p-4 shadow-sm flex items-center">
          <div className="flex items-center gap-3 w-full">
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-bold">{stats?.totalAuthors || 0}</div>
              <div className="text-sm text-gray-500">Authors</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 min-w-[180px] bg-white rounded-lg border p-4 shadow-sm flex items-center">
          <div className="flex items-center gap-3 w-full">
            <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Folder className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <div className="text-xl font-bold">{stats?.totalCategories || 0}</div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Blogs</CardTitle>
              <p className="text-gray-600 mt-1">Manage your blog posts</p>
            </div>
            <Button onClick={() => router.push('/admin/blog/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Blog
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white'>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Published')}>
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Draft')}>
                  Draft
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Scheduled')}>
                  Scheduled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          {/* Blogs Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No blogs found
                    </TableCell>
                  </TableRow>
                ) : (
                  blogs.map((blog) => (
                    <TableRow key={blog._id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{blog.title}</div>
                          <div className="text-sm text-gray-500">
                            by {blog.author.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{blog.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(blog.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-gray-500" />
                          {blog.views}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-500" />
                          {formatDate(blog.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='bg-white'>
                              <DropdownMenuItem onClick={() => handleEdit(blog.slug)} className='hover:bg-gray-200'>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>

                              {blog.status === 'Published' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(blog._id, 'Draft')} className='hover:bg-gray-200'>
                                  Unpublish
                                </DropdownMenuItem>
                              )}

                              {blog.status === 'Draft' && (
                                <DropdownMenuItem onClick={() => handleStatusChange(blog._id, 'Published')} className='hover:bg-gray-200'>
                                  Publish
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuItem
                                onClick={() => handleDelete(blog._id)}
                                className="text-red-600 hover:bg-gray-200"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/blogs/${blog.slug}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}