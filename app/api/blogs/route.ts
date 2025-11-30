// app/api/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Blog from "@/models/Blog";
import { handleError } from "@/lib/utils/error-handler";
import { connectDB } from "@/lib/db";

// Helper function to verify admin token
async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    // Check if token exists and is valid
    // Yahan aap actual token verification logic add kar sakte hain
    return !!token; // Simple check - token exists or not
  } catch (error) {
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Check if user is admin
    const isAdminUser = await isAdmin();

    const { searchParams } = new URL(req.url);

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Filtering parameters
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    // Build query object with role-based access
    const query: any = {};

    // Role-based status filtering
    if (isAdminUser) {
      // Admin can see all blogs (Draft, Published, Scheduled)
      if (status) {
        query.status = status;
      }
      // If no status specified, admin sees all blogs
    } else {
      // Non-admin users can only see published blogs
      query.status = "Published";

      // If non-admin tries to access draft/scheduled blogs, return error
      if (status && status !== "Published") {
        return NextResponse.json(
          {
            success: false,
            error: "ACCESS_DENIED",
            message: "You can only view published blogs",
          },
          { status: 403 }
        );
      }
    }

    // Apply other filters
    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Get blogs with population and sorting
    const blogs = await Blog.find(query)
      // .populate("author", "name email profileImage")
      .select("-content") // Exclude content for listing
      .sort({ createdAt: -1 }) // Latest first
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Blog.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Check if blogs exist
    if (blogs.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "No blogs found",
          data: [],
          pagination: {
            page,
            limit,
            total,
            totalPages,
          },
          accessType: isAdminUser ? "admin" : "public",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      message: isAdminUser
        ? "All blogs fetched successfully"
        : "Published blogs fetched successfully",
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      accessType: isAdminUser ? "admin" : "public",
    });
  } catch (error: any) {
    return handleError(error);
  }
}
