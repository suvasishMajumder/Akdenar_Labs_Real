// lib/validations/blog.ts
import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title must not exceed 100 characters")
    .trim(),

  slug: z
    .string()
    .min(1, "Slug is required")
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug must not exceed 100 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens"
    )
    .trim(),

  shortDescription: z
    .string()
    .max(160, "Short description must not exceed 160 characters")
    .optional()
    .or(z.literal(""))
    .nullable(),

  content: z
    .string()
    .min(1, "Content is required")
    .min(50, "Content must be at least 50 characters"),

  // ⭐ FIXED HERE ↓↓↓
  bannerImage: z
    .string()
    .url("Banner image must be a valid URL")
    .optional()
    .or(z.literal(""))
    .nullable(),

  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must not exceed 50 characters"),

  tags: z
    .array(z.string())
    .max(10, "Maximum 10 tags allowed")
    .optional()
    .default([]),

  authorId: z
    .string()
    .min(1, "Author ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid author ID format"),

  status: z.enum(["Draft", "Published", "Scheduled"]).default("Draft"),

  readingTime: z
    .number()
    .min(1, "Reading time must be at least 1 minute")
    .optional(),

  metaTitle: z
    .string()
    .max(60, "Meta title must not exceed 60 characters")
    .optional()
    .or(z.literal(""))
    .nullable(),

  metaDescription: z
    .string()
    .max(160, "Meta description must not exceed 160 characters")
    .optional()
    .or(z.literal(""))
    .nullable(),

  ogImage: z
    .string()
    .url("OG image must be a valid URL")
    .optional()
    .or(z.literal(""))
    .nullable(),

  publishedAt: z.string().datetime("Invalid date format").optional().nullable(),
});

export type CreateBlogInputSchema = z.infer<typeof createBlogSchema>;
