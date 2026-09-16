import { z } from "zod";

export const passwordRules = {
  length: z.string().min(8, "Password must be at least 8 characters"),
  uppercase: z.string().regex(/[A-Z]/, "Password must contain an uppercase letter"),
  number: z.string().regex(/[0-9]/, "Password must contain a number"),
  special: z.string().regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
};

export const registerSchema = z
  .object({
    fullname: z.string().min(2, "Advocate Name is required"),
    email: z.string().email("Invalid official email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    barNumber: z.string().min(3, "Bar council registration number is required"),
    password: passwordRules.length
      .and(passwordRules.uppercase)
      .and(passwordRules.number)
      .and(passwordRules.special),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
    agreedToTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
