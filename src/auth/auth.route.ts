import express from "express";
import { register, signin } from "./auth.controller";

const router = express.Router();

router.post('/auth/signup', register);
router.post('/auth/login', signin);

export default router;