import { z } from "zod";

export const ContactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(8, "Enter a valid phone number")
    .regex(/^[0-9+\-() ]+$/, "Invalid phone number"),
  services: z.string().min(1, "Please select a service"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export type ContactFormType = z.infer<typeof ContactSchema>;
