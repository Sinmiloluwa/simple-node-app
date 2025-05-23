"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = verifyUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyUser(req, res, next) {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const secret = process.env.JWT_CONSTANT;
    if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: false, message: "Unauthorized" });
            }
            req.user = decoded;
            next();
        });
    });
}
