import { signup } from "./auth.service";
import { Request, Response } from "express";


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

export const register = async function register(req: Request<{}, {}, SignupRequestBody>, res: Response) {
    try {
        const user = await signup(req.body);
        res.status(201).json(user);
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json({ error: message });
    }
}

export const login = async function login(req: Request<{}, {}, { email: string; password: string }>, res: Response) {
    try {

    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json({ error: message });
    }
}
