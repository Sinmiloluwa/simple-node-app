"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoSchema = void 0;
const zod_1 = require("zod");
exports.createTodoSchema = zod_1.z.object({
    task: zod_1.z.string().min(1, "Task is required"),
    remind_at: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }).refine((val) => {
        const now = new Date();
        const date = new Date(val);
        return date >= new Date(now.setHours(0, 0, 0, 0));
    }, {
        message: "Date cannot be less than today",
    }),
    description: zod_1.z.string({ required_error: "Description is required", }).min(1, "Description is required"),
});
