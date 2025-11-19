"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ApplySchema, ApplyFormType } from "@/validations/applyformschema";

/**
 * Corrected ApplyForm
 *
 * Props:
 * - jobTitle: string
 * - open: boolean
 * - setOpen: (open: boolean) => void
 *
 * Notes:
 * - File input is handled via local state `file` (not via react-hook-form register).
 * - Upload API `/api/upload` is expected to accept FormData {"file": <File>}
 *   and return JSON with either { success: true, url } or { secure_url } or nested shapes.
 */

export default function ApplyForm({
  jobTitle,
  open,
  setOpen,
}: {
  jobTitle: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [responseError, setResponseError] = useState<boolean>(false);

  const form = useForm<ApplyFormType>({
    resolver: zodResolver(ApplySchema),
    mode: "onBlur",
  });

  // upload handler — accepts File, returns uploaded URL or throws
  const uploadFileToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData, // DO NOT set Content-Type — browser will set multipart boundary
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.message || "Upload failed";
      throw new Error(msg);
    }

    // Support multiple possible API shapes:
    // - { success: true, url: '...' }
    // - { url: '...' }
    // - { secure_url: '...' }
    // - { data: { secure_url: '...' } }
    const url =
      data?.url ||
      data?.secure_url ||
      data?.data?.secure_url ||
      data?.data?.url ||
      data?.result?.secure_url;

    if (!url) {
      throw new Error("Upload response did not include file URL");
    }

    return url as string;
  };

  const onSubmit = async (values: ApplyFormType) => {
    setResponseMessage("");
    setResponseError(false);

    // If your Zod schema expects resumeUrl, we must ensure a file is provided (or handle optional)
    // Here: require a file before uploading
    if (!file) {
      setResponseError(true);
      setResponseMessage("Please upload your resume (PDF).");
      return;
    }

    setUploading(true);

    try {
      // 1) Upload file and get URL
      const uploadedUrl = await uploadFileToCloudinary(file);

      // 2) Map frontend form keys to backend expected keys
      const payload = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: (values as any).phone || (values as any).phoneNumber, // support both
        linkedin: values.linkedin || "",
        portfolio: values.portfolioUrl || "",
        coverLetter: values.coverLetter || "",
        resumeUrl: uploadedUrl,
        jobTitle,
      };

      // Basic sanity check
      if (!payload.phoneNumber) {
        setResponseError(true);
        setResponseMessage("Please provide a phone number.");
        return;
      }

      // 3) Submit application
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data?.message || "Failed to submit application";
        setResponseError(true);
        setResponseMessage(msg);
        return;
      }

      // Success
      setResponseError(false);
      setResponseMessage("Application submitted successfully!");
      form.reset();
      setFile(null);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setOpen(false);

      setResponseMessage("");
    } catch (err: any) {
      console.error("ApplyForm error:", err);
      setResponseError(true);
      setResponseMessage(err?.message || "Server error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl bg-white">
        <DialogHeader>
          {/* DialogTitle visible so screen readers and users see the context */}
          <DialogTitle className="text-xl font-semibold">
            Apply for {jobTitle}
          </DialogTitle>
        </DialogHeader>

        {/* Live region for server response (accessibility) */}
        <div aria-live="polite" className="min-h-[1.5rem] mt-2">
          {responseMessage && (
            <p
              className={`text-sm ${responseError ? "text-red-600" : "text-green-600"}`}
            >
              {responseMessage}
            </p>
          )}
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-3">
          <div className="flex justify-center gap-3 md:flex-row flex-col">
            {/* Full Name */}
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...form.register("fullName")}
                placeholder="Enter your full name"
                className="mt-2 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
              />
              {form.formState.errors.fullName && (
                <p className="text-red-500 text-sm">
                  {(form.formState.errors.fullName?.message as string) || "Full name is required"}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                {...form.register("email")}
                placeholder="you@example.com"
                className="mt-2 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {(form.formState.errors.email?.message as string) || "Valid email is required"}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-3 md:flex-row flex-col">
            {/* Phone */}
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...form.register("phone")}
                placeholder="1234567890"
                className="mt-2 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-sm">
                  {(form.formState.errors.phone?.message as string) || "Phone is required"}
                </p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
              <Input
                id="linkedin"
                {...form.register("linkedin")}
                placeholder="https://linkedin.com/in/..."
                className="mt-2 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
              />
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <Label htmlFor="portfolioUrl">Portfolio URL (Optional)</Label>
            <Input
              id="portfolioUrl"
              {...form.register("portfolioUrl")}
              placeholder="https://portfolio.com"
              className="mt-2 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              {...form.register("coverLetter")}
              placeholder="Write a short message..."
              className="mt-2 w-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
            />
          </div>

          {/* Resume */}
          <div>
            <Label>Upload Resume (PDF)</Label>
            <input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                setFile(f);
                // clear previous server messages when picking a new file
                setResponseMessage("");
                setResponseError(false);
              }}
              className="mt-2 w-full px-3 border border-gray-300 rounded-lg focus:outline-none text-sm py-2 focus:ring-2 focus:ring-[#7F56D9]"

            />
            {!file && (
              <p className="text-xs text-gray-500 mt-1">Please upload your resume in PDF format.</p>
            )}
            {form.formState.errors.resume && (
              <p className="text-red-500 text-sm">Resume is required</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || uploading}
            >
              {form.formState.isSubmitting || uploading ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
