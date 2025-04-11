"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.LoginUserSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    email: zod_1.z.string().email("Invalid email address"),
    age: zod_1.z.number().min(18, "Age must be at least 18"),
});
exports.LoginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
exports.UpdateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters long").optional(),
});
