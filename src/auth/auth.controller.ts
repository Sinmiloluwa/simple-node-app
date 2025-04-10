import { signup, login } from "./auth.service";
import { Request, Response } from "express";
import { sanitizeUser } from "../helpers/SanitizeUser";


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
        res.status(201).json(sanitizeUser(user));
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json({ error: message });
    }
}

export const signin = async (req: Request<{}, {}, { email: string; password: string }>, res: Response) => {
    try {
        const user = await login( req.body.email, req.body.password );
        res.status(200).json(sanitizeUser(user));
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json({ error: message });
    }
}
