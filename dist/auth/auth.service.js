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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const BadRequestException_1 = require("../exceptions/BadRequestException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const signup = (userSignup) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, email, password } = userSignup;
    const user = yield db_1.db
        .select()
        .from(schema_1.usersTable)
        .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email));
    if (user.length > 0) {
        throw new BadRequestException_1.BadRequestException("User already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    userSignup.password = hashedPassword;
    const newUser = yield db_1.db
        .insert(schema_1.usersTable)
        .values(userSignup).returning();
    return newUser[0];
});
exports.signup = signup;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db
        .select()
        .from(schema_1.usersTable)
        .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email));
    if (user.length === 0) {
        throw new NotFoundException_1.NotFoundException("User not found");
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user[0].password);
    if (!isPasswordValid) {
        throw new BadRequestException_1.BadRequestException("Invalid password");
    }
    return user[0];
});
exports.login = login;
