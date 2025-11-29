// app/api/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import { connectDB } from "@/lib/db";
import { createBlogSchema } from "@/validations/blog";
import { slugify } from "@/lib/utils/slugify";
import { estimateReadingTime } from "@/lib/utils/estimateReadingTime";
import { handleError } from "@/lib/utils/error-handler";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    // Validate the incoming data
    const validationResult = createBlogSchema.safeParse(body);

    if (!validationResult.success) {
      // const errors = formatZodError(validationResult.error);
      console.log(validationResult.error);
      return NextResponse.json(
        {
          error: "Invalid fields",
          // details: errors,
        },
        { status: 400 }
      );
    }

    const {
      title,
      shortDescription,
      content,
      bannerImage,
      category,
      tags,
      authorId,
      status,
      metaTitle,
      metaDescription,
      ogImage,
      publishedAt,
    } = validationResult.data;
    // Generate slug if not provided, or use the validated one
    const finalSlug = slugify(body.slug || title);

    // Calculate reading time
    const readingTime = estimateReadingTime(content);

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug: finalSlug });
    if (existingBlog) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    // Handle publishedAt based on status
    let finalPublishedAt = null;
    if (status === "Published") {
      finalPublishedAt = new Date();
    } else if (status === "Scheduled" && publishedAt) {
      finalPublishedAt = new Date(publishedAt);
    }

    // Create the blog
    await Blog.create({
      title: title.trim(),
      slug: finalSlug,
      shortDescription: shortDescription?.trim() || "",
      content: content.trim(),
      bannerImage: bannerImage || "",
      category: category.trim(),
      tags: tags || [],
      author: authorId,
      status: status || "Draft",
      readingTime,
      metaTitle: metaTitle?.trim() || "",
      metaDescription: metaDescription?.trim() || "",
      ogImage: ogImage || "",
      publishedAt: finalPublishedAt,
    });

    return NextResponse.json(
      {
        message: "Blog created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Blog creation error:", error);
    handleError(error);
  }
}
