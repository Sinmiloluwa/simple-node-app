import { verifyUser } from "../guards/auth.guard";
import express from "express";
import { updateUsername, forgotPassword } from "./user.controller";

const router = express.Router();

router.put('/user/update-name', verifyUser, updateUsername);
router.post('/user/forgot-password', forgotPassword);

export default router;