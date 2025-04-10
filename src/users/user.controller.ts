// import { Request, Response } from "express";
// import { errorResponse, successResponse } from "../utils/response";
// import { updateName } from "./user.service";

// export const updateUsername = async (req, res) => {
//     const { userId, newName } = req.body;
//     try {
        
//     } catch (error) {
//         const status = (error as any)?.status || 500;
//         const message = (error as any)?.message || "Internal server error";
//         res.status(status).json(errorResponse(message));
//     }
// }