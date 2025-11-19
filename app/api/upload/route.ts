import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file received" },
        { status: 400 }
      );
    }

    // 🔥 Sanitize filename
    const originalName = file.name || "resume.pdf";
    const sanitizedName = sanitizeFileName(originalName);

    // Convert File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "akdenar-labs",
            public_id: sanitizedName.replace(".pdf", ""), // remove extension when uploading
            resource_type: "raw", // PDF is raw type
            format: "pdf", // ensure extension preserved
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(buffer);
    });
    return NextResponse.json(
      { message: "File uploaded successfully", data: uploadResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}

function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/[^a-z0-9.\-]/g, "") // remove special chars except dot & hyphen
    .replace(/-+/g, "-") // remove multiple hyphens
    .replace(/\.{2,}/g, ".") // prevent ".." sequences
    .replace(/^\-+|\-+$/g, ""); // trim hyphens at start/end
}
