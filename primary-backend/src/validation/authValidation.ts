import { z } from "zod";

// Signup validation schema
// Defines the shape and constraints of signup request data
export const signupSchema = z.object({
  // Name must be a string with 2-50 characters
  name: z
    .string()
    .nonempty("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(), // Remove leading/trailing whitespace

  // Email must be valid format and normalized to lowercase
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format")
    .toLowerCase() // Convert to lowercase for consistency
    .trim(),

  // Strong password requirements
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

// Login validation schema
// Email and password are required, but less strict than signup
export const loginSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase().trim(),

  // No regex check on login - we just verify against stored hash
  password: z.string().min(1, "Password is required"),
});

// Refresh token validation schema
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

// TypeScript types inferred from Zod schemas
// These give us type safety throughout the application
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
