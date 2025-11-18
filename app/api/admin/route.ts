import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";
import { AdminLoginSchema } from "@/validations/admin";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Zod validation
    const parsed = AdminLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // Check admin in DB
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 400 });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create simple session cookie
    const res = NextResponse.json({
      message: "Login successful",
    });

    return res;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
