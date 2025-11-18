import { z } from "zod";
export const AdminLoginSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }),

  password: z
    .string()
    .min(8, "Password must be 8 characters or more")
    .max(50, "Password is too long")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
});

export type AdminLoginType = z.infer<typeof AdminLoginSchema>;
