"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.updateUsername = void 0;
const response_1 = require("../utils/response");
const user_service_1 = require("./user.service");
const updateUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_service_1.updateName)(req.user.id, req.body.name);
        res.status(200).json((0, response_1.successResponse)("Username updated successfully"));
    }
    catch (error) {
        const status = (error === null || error === void 0 ? void 0 : error.status) || 500;
        const message = (error === null || error === void 0 ? void 0 : error.message) || "Internal server error";
        res.status(status).json((0, response_1.errorResponse)(message));
    }
});
exports.updateUsername = updateUsername;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Implement your logic here
        res.status(200).json((0, response_1.successResponse)("Password reset link sent to your email"));
    }
    catch (error) {
        const status = (error === null || error === void 0 ? void 0 : error.status) || 500;
        const message = (error === null || error === void 0 ? void 0 : error.message) || "Internal server error";
        res.status(status).json((0, response_1.errorResponse)(message));
    }
});
exports.forgotPassword = forgotPassword;
