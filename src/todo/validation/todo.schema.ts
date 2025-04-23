import { z } from "zod";

export const createTodoSchema = z.object({
  task: z.string().min(1, "Task is required"),
  remind_at: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }).refine((val) => {
    const now = new Date();
    const date = new Date(val);
    return date >= new Date(now.setHours(0, 0, 0, 0));
  }, {
    message: "Date cannot be less than today",
  }),
  description: z.string({required_error: "Description is required",}).min(1, "Description is required"),
});