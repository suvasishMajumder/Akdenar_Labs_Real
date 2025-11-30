// lib/validations/author.ts
import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(),

  position: z
    .string()
    .max(100, "Position must not exceed 100 characters")
    .optional()
    .or(z.literal("")),

  avatar: z
    .string()
    .url("Avatar must be a valid URL")
    .optional()
    .or(z.literal("")),

  bio: z
    .string()
    .max(500, "Bio must not exceed 500 characters")
    .optional()
    .or(z.literal("")),

  socialLinks: z
    .object({
      linkedin: z
        .string()
        .url("LinkedIn must be a valid URL")
        .optional()
        .or(z.literal("")),
      twitter: z
        .string()
        .url("Twitter must be a valid URL")
        .optional()
        .or(z.literal("")),
      github: z
        .string()
        .url("GitHub must be a valid URL")
        .optional()
        .or(z.literal("")),
    })
    .optional()
    .default({}),
});

export const updateAuthorSchema = createAuthorSchema.partial();

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>;
export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>;
