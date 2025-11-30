// lib/utils/validation.ts
import { ZodError } from "zod";

export function formatZodError(error: unknown): Record<string, string> {
  const errors: Record<string, string> = {};

  if (error instanceof ZodError) {
    error.issues.forEach((err) => {
      const path = err.path.join(".") || "unknown";
      errors[path] = err.message;
    });
  } else {
    errors["_general"] = "Validation failed";
  }

  return errors;
}
