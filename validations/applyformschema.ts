import { z } from "zod";

export const ApplySchema = z.object({
  fullName: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be 10 digits"),
  linkedin: z.string().optional(),
  portfolioUrl: z.string().optional(),
  coverLetter: z.string().optional(),
  resume: z.any(),
});

export type ApplyFormType = z.infer<typeof ApplySchema>;
