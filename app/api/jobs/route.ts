import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { JobApplication } from "@/models/JobApplication";
import { JobApplicationSchema } from "@/validations/jobapplication";

export async function GET() {
  try {
    await connectDB();

    const applications = await JobApplication.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Validate inputs
    const parsed = JobApplicationSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const newApplication = await JobApplication.create(parsed.data);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
