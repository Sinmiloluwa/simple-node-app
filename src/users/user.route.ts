import { verifyUser } from "../guards/auth.guard";
import express from "express";
import { updateUsername, forgotPassword, resetPassword } from "./user.controller";

const router = express.Router();

router.put('/update-name', verifyUser, updateUsername);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;