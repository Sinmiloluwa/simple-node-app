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
exports.forgotPassword = exports.updateName = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
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
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db
        .select()
        .from(schema_1.usersTable)
        .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email));
    if (user.length === 0) {
        throw new Error("User not found");
    }
});
exports.forgotPassword = forgotPassword;
