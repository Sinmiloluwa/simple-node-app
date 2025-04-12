"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.sendForgotPassword = exports.updateName = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const mailer = __importStar(require("nodemailer"));
const BadRequestException_1 = require("../exceptions/BadRequestException");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const updateName = (userId, newName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db
        .update(schema_1.usersTable)
        .set({ name: newName })
        .where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, userId))
        .returning();
    if (user.length === 0) {
        throw new Error("User not found");
    }
    return user[0];
});
exports.updateName = updateName;
const sendForgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db
        .select()
        .from(schema_1.usersTable)
        .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email));
    if (user.length === 0) {
        throw new BadRequestException_1.BadRequestException("User not found");
    }
    const token = Math.random().toString(20).substring(2, 15);
    yield db_1.db.insert(schema_1.tokensTable).values({
        userId: user[0].id,
        token: token,
        createdAt: Math.floor(Date.now() / 1000),
        expiresAt: Math.floor(Date.now() / 1000) + 3600,
    });
    sendEmail(email, token);
});
exports.sendForgotPassword = sendForgotPassword;
const changePassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = yield db_1.db
        .select()
        .from(schema_1.tokensTable)
        .where((0, drizzle_orm_1.eq)(schema_1.tokensTable.token, token));
    if (tokenData.length === 0) {
        throw new BadRequestException_1.BadRequestException("Token not found");
    }
    if (tokenData[0].expiresAt < Math.floor(Date.now() / 1000)) {
        throw new BadRequestException_1.BadRequestException("Token expired");
    }
    const userPassword = yield db_1.db
        .select({ password: schema_1.usersTable.password })
        .from(schema_1.usersTable)
        .where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, tokenData[0].userId));
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
    if (userPassword[0].password === newPassword) {
        throw new BadRequestException_1.BadRequestException("New password must be different from the old password");
    }
    const user = yield db_1.db
        .update(schema_1.usersTable)
        .set({ password: hashedPassword })
        .where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, tokenData[0].userId))
        .returning();
    if (user.length === 0) {
        throw new BadRequestException_1.BadRequestException("User not found");
    }
    yield db_1.db
        .delete(schema_1.tokensTable)
        .where((0, drizzle_orm_1.eq)(schema_1.tokensTable.token, token));
});
exports.changePassword = changePassword;
function sendEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = mailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: email,
            subject: "Reset Password",
            text: `Click the link to reset your password: ${process.env.APP_URL}/reset-password/${token}`,
        };
        yield transporter.sendMail(mailOptions);
    });
}
