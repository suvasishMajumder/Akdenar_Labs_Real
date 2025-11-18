"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";

// React Hook Form + Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProjectEnquirySchema,
  ProjectEnquiryType,
} from "@/validations/enquiry";

export default function EnquiryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectEnquiryType>({
    resolver: zodResolver(ProjectEnquirySchema),
  });

  // Cloudinary Upload Function
  const uploadFileToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Upload failed");

    return data.data.secure_url;
  };

  // Final Submit Handler
  const onSubmit = async (formData: ProjectEnquiryType) => {
    setResponse("");
    setUploading(true);

    let uploadedUrl = "";

    try {
      // 1. Upload file if selected and no validation errors
      if (file && Object.keys(errors).length === 0) {
        uploadedUrl = await uploadFileToCloudinary(file);
      }

      // 2. Final payload
      const payload = {
        formType: "project-inquiry",
        ...formData,
        attachmentUrl: uploadedUrl,
      };

      // 3. Send to enquiry API
      const res = await fetch("/api/enquiry", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse(data.message || "Something went wrong");
        return;
      }

      setResponse("Project enquiry submitted successfully!");
      reset();
      setFile(null);

    } catch (err) {
      setResponse("Server Error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <section className="py-20 mt-6 px-6 md:px-10 lg:px-24 bg-bg-primary">

        {/* Heading */}
        <div>
          <h2 className="text-center text-3xl md:text-5xl tracking-tight text-gray-900">
            Project Enquiry Form
          </h2>
          <p className="text-center text-neutral-600 mt-3 max-w-3xl mx-auto leading-relaxed">
            Share your project details — we'll get back within 24 hours.
          </p>
        </div>

        {/* Layout */}
        <div className="mt-14 flex flex-col items-center">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm p-8">

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Full Name */}
                <FormField label="Full Name *" error={errors.fullName?.message}>
                  <Input
                    placeholder="John Doe"
                    className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    {...register("fullName")}
                  />
                </FormField>

                {/* Email */}
                <FormField label="Email *" error={errors.email?.message}>
                  <Input type="email"
                    className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    placeholder="you@example.com" {...register("email")} />
                </FormField>

                {/* Phone */}
                <FormField label="Phone *" error={errors.phone?.message}>
                  <Input placeholder="+91 9876543210"
                    className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    {...register("phone")} />
                </FormField>

                {/* Company */}
                <FormField label="Company (optional)">
                  <Input placeholder="Your company name"
                    className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    {...register("company")} />
                </FormField>

                {/* Website */}
                <FormField label="Website (optional)">
                  <Input placeholder="https://example.com"
                    className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    {...register("website")} />
                </FormField>

                {/* Project Type */}
                <FormField label="Project Type *" error={errors.projectType?.message}>
                  <Select onValueChange={(v) => setValue("projectType", v)}>
                    <SelectTrigger
                      className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-white">
                      <SelectItem value="web">Website</SelectItem>
                      <SelectItem value="app">App</SelectItem>
                      <SelectItem value="uiux">UI/UX</SelectItem>
                      <SelectItem value="ai">AI Automation</SelectItem>
                      <SelectItem value="devops">Cloud & DevOps</SelectItem>
                      <SelectItem value="marketing">Digital Marketing</SelectItem>
                      <SelectItem value="custom">Custom Software</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                {/* Budget */}
                <FormField label="Estimated Budget *" error={errors.estimatedBudget?.message}>
                  <Select onValueChange={(v) => setValue("estimatedBudget", v)}>
                    <SelectTrigger
                      className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    >
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-white">
                      <SelectItem value="10-50k">10k–50k</SelectItem>
                      <SelectItem value="50k-2l">50k–2L</SelectItem>
                      <SelectItem value="2-10l">2L–10L</SelectItem>
                      <SelectItem value="10-50l">10L–50L</SelectItem>
                      <SelectItem value="50l-1cr">50L–1CR</SelectItem>
                      <SelectItem value="1cr+">1CR+</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                {/* Timeline */}
                <FormField label="Timeline *" error={errors.timeline?.message}>
                  <Select onValueChange={(v) => setValue("timeline", v)}>
                    <SelectTrigger
                      className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-white">
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-3-week">2-3 Weeks</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="2-month">2-3 Months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              {/* Description */}
              <div className="mt-8 space-y-8">
                <FormField label="Project Description *" error={errors.description?.message}>
                  <Textarea
                    className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    {...register("description")}
                    placeholder="Explain your project..."
                  />
                </FormField>

                <FormField label="Expected Outcome (optional)">
                  <Textarea
                    {...register("expectedOutcome")}
                    className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    placeholder="Tell us what success looks like..."
                  />
                </FormField>

                {/* Upload */}
                <FormField label="Attachment (optional)">
                  <Input
                    type="file"
                    className="mt-2 w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9] resize-none"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  {file && <p className="text-xs mt-1">{file.name}</p>}
                </FormField>
              </div>

              {/* Submit */}
              <div className="mt-8 text-right">
                <Button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="bg-[#7F56D9] hover:bg-[#6b45cc] text-white"
                >
                  {isSubmitting || uploading ? "Submitting..." : "Submit"}
                </Button>
              </div>

              {response && (
                <p className="mt-4 text-green-600 text-sm">{response}</p>
              )}
            </form>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* UI Component */
function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: any;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-800">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
