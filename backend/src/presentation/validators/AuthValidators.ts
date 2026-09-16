import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Not a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Not a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const verifyRegistrationSchema = z.object({
  body: z.object({
    email: z.string().email("Not a valid email"),
    otp: z.string().length(6, "OTP must be 6 digits"),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Not a valid email"),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Not a valid email"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
