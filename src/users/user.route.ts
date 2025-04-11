import { verifyUser } from "../guards/auth.guard";
import express from "express";
import { updateUsername } from "./user.controller";

const router = express.Router();

router.put('/user/update-name', verifyUser, updateUsername);

export default router;