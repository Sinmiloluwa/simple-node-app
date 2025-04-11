import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Age must be at least 18"),
});

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
});