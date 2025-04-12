import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import { updateName, sendForgotPassword, changePassword } from "./user.service";

export const updateUsername = async (req: any, res: Response): Promise<void> => {
    try {
        await updateName(req.user.id, req.body.name);
        res.status(200).json(successResponse("Username updated successfully"));
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json(errorResponse(message));
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        await sendForgotPassword(req.body.email);
        res.status(200).json(successResponse("Password reset link sent to your email"));
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json(errorResponse(message));
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        await changePassword(req.body.token, req.body.password);
        res.status(200).json(successResponse("Password reset successfully"));
    } catch (error) {
        const status = (error as any)?.status || 500;
        const message = (error as any)?.message || "Internal server error";
        res.status(status).json(errorResponse(message));
    }
}