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

    // Sanitize filename
    const originalName = file.name || "upload-file";
    const sanitizedName = sanitizeFileName(originalName).split(".")[0]; // remove extension safely

    // Convert File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Auto-detect upload type: image, video, raw, etc.
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "akdenar-labs",
            public_id: sanitizedName,
            resource_type: "auto", // 👈 KEY FIX: auto detect (image, pdf, video)
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
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/\.{2,}/g, ".")
    .replace(/^\-+|\-+$/g, "");
}
