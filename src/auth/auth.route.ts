import express from "express";
import { register } from "./auth.controller";

const router = express.Router();

router.post('/auth/login', register);

export default router;