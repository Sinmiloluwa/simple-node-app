import { z } from "zod";

export const createTodoSchema = z.object({
  task: z.string().min(1, "Task is required"),
  remind_at: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  description: z.string({required_error: "Description is required",}).min(1, "Description is required"),
});