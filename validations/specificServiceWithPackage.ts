import { z } from "zod";

export const SpecificServiceWithPackageSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Message is too short"),
});

export type SpecificServiceWithPackageType = z.infer<
  typeof SpecificServiceWithPackageSchema
>;
