import { z } from "zod";

const requiredString = (message: string) =>
  z.string().trim().min(1, { message });

export const signupSchema = z.object({
  email: requiredString("Email is required").email({
    message: "Invalid email address",
  }),
  username: requiredString("Username is required").regex(/^[a-z0-9]+$/i, {
    message: "Username must contain only letters and numbers",
  }),
  password: requiredString("Password is required").min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export type SignupValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: requiredString("Username is required"),
  password: requiredString("Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

