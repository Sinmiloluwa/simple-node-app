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
exports.signin = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const SanitizeUser_1 = require("../helpers/SanitizeUser");
const response_1 = require("../utils/response");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_service_1.signup)(req.body);
        res.status(201).json((0, response_1.successResponse)("User created successfully"));
    }
    catch (error) {
        const status = (error === null || error === void 0 ? void 0 : error.status) || 500;
        const message = (error === null || error === void 0 ? void 0 : error.message) || "Internal server error";
        res.status(status).json((0, response_1.errorResponse)(message));
    }
});
exports.register = register;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, auth_service_1.login)(req.body.email, req.body.password);
        return res.status(201).json((0, response_1.createdResponse)("Successful login", (0, SanitizeUser_1.sanitizeUser)(user)));
    }
    catch (error) {
        const status = (error === null || error === void 0 ? void 0 : error.status) || 500;
        const message = (error === null || error === void 0 ? void 0 : error.message) || "Internal server error";
        res.status(status).json({ error: message });
    }
});
exports.signin = signin;
