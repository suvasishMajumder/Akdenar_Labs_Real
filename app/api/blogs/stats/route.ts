import { connectDB } from "@/lib/db";
import { handleError } from "@/lib/utils/error-handler";
import Author from "@/models/Author";
import Blog from "@/models/Blog";
import { NextRequest } from "next/server";

// Alternative version with Promise.all
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Run all queries in parallel
    const [blogStats, totalAuthors, categoryStats] = await Promise.all([
      // Blog statistics
      Blog.aggregate([
        {
          $group: {
            _id: null,
            totalBlogs: { $sum: 1 },
            publishedBlogs: {
              $sum: { $cond: [{ $eq: ["$status", "Published"] }, 1, 0] },
            },
            draftBlogs: {
              $sum: { $cond: [{ $eq: ["$status", "Draft"] }, 1, 0] },
            },
            scheduledBlogs: {
              $sum: { $cond: [{ $eq: ["$status", "Scheduled"] }, 1, 0] },
            },
            totalViews: { $sum: "$views" },
            totalReadingTime: { $sum: "$readingTime" },
          },
        },
      ]),

      // Total authors count
      Author.countDocuments(),

      // Unique categories count
      Blog.aggregate([
        {
          $group: {
            _id: "$category",
          },
        },
        {
          $count: "totalCategories",
        },
      ]),
    ]);

    const stats = blogStats[0] || {
      totalBlogs: 0,
      publishedBlogs: 0,
      draftBlogs: 0,
      scheduledBlogs: 0,
      totalViews: 0,
      totalReadingTime: 0,
    };

    return Response.json({
      success: true,
      data: {
        overview: {
          ...stats,
          totalAuthors,
          totalCategories: categoryStats[0]?.totalCategories || 0,
        },
      },
    });
  } catch (error: any) {
    return handleError(error);
  }
}
