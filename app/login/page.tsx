"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Footer from "@/components/home/Footer";
import { useRouter } from "next/navigation";

// Zod + React Hook Form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLoginType, AdminLoginSchema } from "@/validations/admin";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginType>({
    resolver: zodResolver(AdminLoginSchema),
  });

  // On Submit Handler
  const onSubmit = async (data: AdminLoginType) => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Invalid credentials");
        return;
      }

      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full px-4 py-10 pt-18 bg-gray-50 flex justify-center items-center">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden flex">
          {/* LEFT SIDE: FORM */}
          <div className="p-10 flex-1 flex flex-col justify-center">

            <h1 className="text-3xl font-bold text-gray-900">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  placeholder="Enter your email"
                  className="interactive-input"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="mt-5 space-y-1">
                <label className="text-sm font-medium text-gray-700">Password</label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="interactive-input pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1.5 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="mt-2 text-right">
                <a className="text-sm font-medium text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                disabled={isSubmitting}
                className="w-full mt-6 h-11 text-white bg-primary hover:bg-[#5a6fe0] rounded-full"
                type="submit"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              {/* Note */}
              <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-700 mb-1">Note</h4>
                <p className="text-sm text-gray-600">
                  The login credentials will be provided to the employee by the organization.
                </p>
              </div>

            </form>
          </div>

          {/* RIGHT SIDE: ILLUSTRATION */}
          <div className="hidden relative flex-1 md:flex items-center justify-center">
            <Image
              src="/login.png"
              alt="Login Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
