import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Official email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Chamber password is required")
    .min(6, "Password must be at least 6 characters long"),
  rememberWorkstation: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;