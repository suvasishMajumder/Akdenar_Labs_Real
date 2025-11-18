import { z } from "zod";

export const ProjectEnquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Phone number is required"),
  company: z.string().optional(),
  website: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  estimatedBudget: z.string().min(1, "Select budget"),
  timeline: z.string().min(1, "Select timeline"),
  description: z.string().min(10, "Please describe your project"),
  expectedOutcome: z.string().optional(),
});

export type ProjectEnquiryType = z.infer<typeof ProjectEnquirySchema>;
