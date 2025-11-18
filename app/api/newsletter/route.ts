import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Newsletter } from "@/models/Newsletter";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Simple email validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    await connectDB();

    // Check if email already exists
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 400 }
      );
    }

    await Newsletter.create({ email });

    return NextResponse.json(
      { message: "Subscribed successfully!" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const newsletters = await Newsletter.find();
    return NextResponse.json({ success: true, newsletters });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch newsletter count" },
      { status: 500 }
    );
  }
}
