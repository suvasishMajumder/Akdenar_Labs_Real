// app/api/authors/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { handleError } from "@/lib/utils/error-handler";
import { createAuthorSchema } from "@/validations/author";
import { formatZodError } from "@/lib/utils/validation";
import Author from "@/models/Author";

// GET all authors
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const search = searchParams.get("search");

    // Build query
    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ];
    }

    const [authors, total] = await Promise.all([
      Author.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

      Author.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return Response.json({
      success: true,
      message: "Authors fetched successfully",
      data: authors,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error: any) {
    return handleError(error);
  }
}

// POST create new author
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    // Validate input
    const validationResult = createAuthorSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = formatZodError(validationResult.error);
      return Response.json(
        {
          success: false,
          error: "VALIDATION_ERROR",
          message: "Validation failed",
          details: errors,
        },
        { status: 400 }
      );
    }

    const { name, position, avatar, bio, socialLinks } = validationResult.data;

    // Check if author with same name already exists
    const existingAuthor = await Author.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingAuthor) {
      return Response.json(
        {
          success: false,
          error: "DUPLICATE_AUTHOR",
          message: "Author with this name already exists",
        },
        { status: 409 }
      );
    }

    // Create author
    const author = await Author.create({
      name: name.trim(),
      position: position?.trim() || "",
      avatar: avatar || "",
      bio: bio?.trim() || "",
      socialLinks: socialLinks || {},
    });

    return Response.json(
      {
        success: true,
        message: "Author created successfully",
        data: author,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return handleError(error);
  }
}

// export async function GET(req: NextRequest) {
//   await connectDB();
//   const body = {
//     name: "Nitish Mishra",
//     position: "Software Tester",
//     bio: "I am a software tester who have 5 year of experience in testing.",
//   };
//   let user = await Author.create(body);
//   return NextResponse.json({ user, message: "Author created successfully" });
// }
