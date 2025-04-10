import { signup, login } from "./auth.service";
import { Request, Response } from "express";
import { sanitizeUser } from "../helpers/SanitizeUser";
import { createdResponse, errorResponse, successResponse } from "../utils/response";


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

export const register = async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
    try {
        const user = await signup(req.body);
        res.status(201).json(successResponse("User created successfully"));
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json(errorResponse(message));
    }
}

export const signin = async (req: Request<{}, {}, { email: string; password: string }>, res: any) => {
    try {
        const user = await login( req.body.email, req.body.password );
        return res.status(201).json(createdResponse("Successful login", sanitizeUser(user)));
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json({ error: message });
    }
}
