// app/api/blogs/[slug]/route.ts
import { connectDB } from "@/lib/db";
import { handleError } from "@/lib/utils/error-handler";
import { estimateReadingTime } from "@/lib/utils/estimateReadingTime";
import { slugify } from "@/lib/utils/slugify";
import Blog from "@/models/Blog";
import { createBlogSchema } from "@/validations/blog";
import { NextRequest, NextResponse } from "next/server";

// update status of blog
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // params is Promise
) {
  try {
    await connectDB();
    const { slug } = await params;

    const body = await req.json();
    const { status } = body;

    const blog = await Blog.findByIdAndUpdate(
      slug,
      {
        status,
        ...(status === "Published" && { publishedAt: new Date() }),
      },
      { new: true }
    );

    if (!blog) {
      return Response.json(
        {
          success: false,
          error: "BLOG_NOT_FOUND",
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error: any) {
    return handleError(error);
  }
}

// delete blog
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // params is Promise
) {
  try {
    await connectDB();

    const { slug } = await params;

    // delete images used in this blog

    const blog = await Blog.findByIdAndDelete(slug);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: "BLOG_NOT_FOUND",
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    return handleError(error);
  }
}

// get single blog detail
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // params is Promise
) {
  try {
    await connectDB();

    const { slug } = await params;

    let blog = await Blog.findOne({ slug }).populate("author", "name");

    if (!blog) {
      return NextResponse.json({
        success: false,
        message: "blog not found",
      });
    }

    blog.views += 1;
    await blog.save();
    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return handleError(error);
  }
}

// edit blog
export async function PUT(req: NextRequest) {
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
    } = validationResult.data;

    // Generate slug if not provided, or use the validated one
    const finalSlug = slugify(body.slug || title);

    // Calculate reading time
    const readingTime = estimateReadingTime(content);

    // Check if slug already exists
    await Blog.findOneAndUpdate(
      { slug: finalSlug },
      {
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
      }
    );

    return NextResponse.json(
      {
        message: "Blog updated successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Blog creation error:", error);
    handleError(error);
  }
}
