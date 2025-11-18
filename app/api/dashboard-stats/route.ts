import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models/Inquiry";
import { Newsletter } from "@/models/Newsletter";

export async function GET() {
  try {
    await connectDB();

    // Aggregate counts
    const [
      getInTouch,
      projectInquiry,
      packageInquiry,
      newsLetterCount,
      total,
      recent,
    ] = await Promise.all([
      Inquiry.countDocuments({ formType: "get-in-touch" }),
      Inquiry.countDocuments({ formType: "project-inquiry" }),
      Inquiry.countDocuments({ formType: "quick-contact" }),
      Newsletter.countDocuments(),
      Inquiry.countDocuments(),
      Inquiry.find().sort({ createdAt: -1 }).limit(10),
    ]);

    // Flatten package fields
    const transformedRecent = recent.map((item) => {
      const row: any = item.toObject();
      if (row.package) {
        row.packageName = row.package.name;
        row.packagePrice = row.package.price;
      }
      return row;
    });

    return NextResponse.json({
      success: true,
      stats: {
        total,
        getInTouch,
        projectInquiry,
        packageInquiry,
        newsLetterCount,
      },
      recent: transformedRecent,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
