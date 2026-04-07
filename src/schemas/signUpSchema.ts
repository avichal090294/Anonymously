import { z } from "zod";

export const usernameValidation = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must not be more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscore allowed");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z
    .email({ message: "Invalid email address" })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});