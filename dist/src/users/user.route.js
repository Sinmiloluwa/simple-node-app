"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_guard_1 = require("../guards/auth.guard");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.put('/update-name', auth_guard_1.verifyUser, user_controller_1.updateUsername);
router.post('/forgot-password', user_controller_1.forgotPassword);
router.post('/reset-password', user_controller_1.resetPassword);
exports.default = router;
