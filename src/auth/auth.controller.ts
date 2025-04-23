import { signup, login } from "./auth.service";
import { Request, Response } from "express";
import { sanitizeUser } from "../helpers/SanitizeUser";
import { createdResponse, errorResponse, successResponse, validationError } from "../utils/response";
import { CreateUserSchema, LoginUserSchema } from "./validation/auth.schema";


interface SignupRequestBody {
    name: string;
    age: number;
    email: string;
    password: string;
}

interface User {
    id: string;
    username: string;
    email?: string;
}

export const register = async (req: Request<{}, {}, SignupRequestBody>, res: any) => {
    const result = CreateUserSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(422).json(validationError("Validation failed", result.error.flatten().fieldErrors));
      }

    try {
        const user = await signup(req.body);
        return res.status(201).json(successResponse("User created successfully"));
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json(errorResponse(message));
    }
}

export const signin = async (req: Request<{}, {}, { email: string; password: string }>, res: any) => {
    const result = LoginUserSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(422).json(validationError("Validation failed", result.error.flatten().fieldErrors));
      }

    try {
        const user = await login( req.body.email, req.body.password );
        return res.status(201).json(createdResponse("Successful login", sanitizeUser(user)));
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json({ error: message });
    }
}

