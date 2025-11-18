"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
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

export default function ApplyForm({
  jobTitle,
  open,
  setOpen
}: {
  jobTitle: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<ApplyFormType>({
    resolver: zodResolver(ApplySchema),
  });

  const onSubmit = (values: ApplyFormType) => {
    console.log("Submitted Data:", values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Apply for {jobTitle}
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-3">

          {/* Full Name */}
          <div>
            <Label>Full Name</Label>
            <Input
              {...form.register("fullName")}
              placeholder="Enter your full name"
            />
            {form.formState.errors.fullName && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label>Email Address</Label>
            <Input
              {...form.register("email")}
              placeholder="you@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label>Phone Number</Label>
            <Input
              {...form.register("phone")}
              placeholder="1234567890"
            />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <Label>LinkedIn Profile (Optional)</Label>
            <Input
              {...form.register("linkedin")}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          {/* Portfolio */}
          <div>
            <Label>Portfolio URL (Optional)</Label>
            <Input
              {...form.register("portfolioUrl")}
              placeholder="https://portfolio.com"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <Label>Cover Letter</Label>
            <Textarea
              {...form.register("coverLetter")}
              placeholder="Write a short message..."
            />
          </div>

          {/* Resume */}
          <div>
            <Label>Upload Resume (PDF)</Label>
            <Input
              type="file"
              accept=".pdf"
              {...form.register("resume")}
            />
            {form.formState.errors.resume && (
              <p className="text-red-500 text-sm">
                Resume is required
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full bg-blue-600">
              Submit Application
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}
