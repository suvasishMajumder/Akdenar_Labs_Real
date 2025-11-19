import { z } from "zod";

export const JobApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().min(1),
  jobTitle: z.string().min(1),
});

export type JobApplicationType = z.infer<typeof JobApplicationSchema>;
