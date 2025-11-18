import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models/Inquiry";
import { sanitizeObject } from "@/lib/sanitize";
import { Newsletter } from "@/models/Newsletter";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Sanitize entire input
    const data = sanitizeObject(body);

    if (!data.formType) {
      return NextResponse.json(
        { message: "formType is required" },
        { status: 400 }
      );
    }

    // OPTIONAL: normalize email
    if (data.email) {
      data.email = data.email.toLowerCase().trim();
    }

    const saved = await Inquiry.create(data);

    return NextResponse.json(
      { message: "Inquiry submitted successfully", inquiry: saved },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type"); // form type filter
    const search = searchParams.get("search"); // search by name
    const order = searchParams.get("order") || "desc"; // asc | desc

    // Pagination parameters
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // if type is newsletter than
    if (type === "newsletter") {
      let newsletters = await Newsletter.find();
      return NextResponse.json({ success: true, data: newsletters });
    }

    let filter: any = {};

    // Form type filter
    if (type)
      filter.formType =
        type === "contact"
          ? "get-in-touch"
          : type === "project"
            ? "project-inquiry"
            : "quick-contact";

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting (only createdAt)
    type sortQueryType = {
      createdAt: 1 | -1;
    };
    const sortQuery: sortQueryType = {
      createdAt: order === "asc" ? 1 : -1,
    };

    // Total count (for pagination UI)
    const total = await Inquiry.countDocuments(filter);

    // Fetch paginated data
    const data = await Inquiry.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
