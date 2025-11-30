// app/api/authors/[id]/route.ts
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Author from "@/models/Author";
import Blog from "@/models/Blog";
import { handleError } from "@/lib/utils/error-handler";
import { updateAuthorSchema } from "@/validations/author";
import { formatZodError } from "@/lib/utils/validation";

// GET single author by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is Promise
) {
  try {
    await connectDB();
    const { id } = await params;

    const author = await Author.findById(id).lean();

    if (!author) {
      return Response.json(
        {
          success: false,
          error: "AUTHOR_NOT_FOUND",
          message: "Author not found",
        },
        { status: 404 }
      );
    }

    // Get author's blogs count
    const blogsCount = await Blog.countDocuments({ author: id });

    return Response.json({
      success: true,
      message: "Author fetched successfully",
      data: {
        ...author,
        blogsCount,
      },
    });
  } catch (error: any) {
    return handleError(error);
  }
}

// PATCH update author
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is Promise
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    // Validate input
    const validationResult = updateAuthorSchema.safeParse(body);

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

    // Check if author exists
    const existingAuthor = await Author.findById(id);
    if (!existingAuthor) {
      return Response.json(
        {
          success: false,
          error: "AUTHOR_NOT_FOUND",
          message: "Author not found",
        },
        { status: 404 }
      );
    }

    // Check for duplicate name (if name is being updated)
    if (name && name !== existingAuthor.name) {
      const duplicateAuthor = await Author.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
        _id: { $ne: id },
      });

      if (duplicateAuthor) {
        return Response.json(
          {
            success: false,
            error: "DUPLICATE_AUTHOR",
            message: "Author with this name already exists",
          },
          { status: 409 }
        );
      }
    }

    // Update author
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        ...(name && { name: name.trim() }),
        ...(position !== undefined && { position: position?.trim() || "" }),
        ...(avatar !== undefined && { avatar: avatar || "" }),
        ...(bio !== undefined && { bio: bio?.trim() || "" }),
        ...(socialLinks && {
          socialLinks: { ...existingAuthor.socialLinks, ...socialLinks },
        }),
      },
      { new: true, runValidators: true }
    );

    return Response.json({
      success: true,
      message: "Author updated successfully",
      data: updatedAuthor,
    });
  } catch (error: any) {
    return handleError(error);
  }
}

// DELETE author
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is Promise
) {
  try {
    await connectDB();
    const { id } = await params;

    // Check if author exists
    const author = await Author.findById(id);
    if (!author) {
      return Response.json(
        {
          success: false,
          error: "AUTHOR_NOT_FOUND",
          message: "Author not found",
        },
        { status: 404 }
      );
    }

    // Check if author has any blogs
    const authorBlogs = await Blog.countDocuments({ author: id });
    if (authorBlogs > 0) {
      return Response.json(
        {
          success: false,
          error: "AUTHOR_HAS_BLOGS",
          message: "Cannot delete author with existing blogs",
        },
        { status: 400 }
      );
    }

    // Delete author
    await Author.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Author deleted successfully",
    });
  } catch (error: any) {
    return handleError(error);
  }
}
