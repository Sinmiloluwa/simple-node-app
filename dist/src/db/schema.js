"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosTable = exports.tokensTable = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    name: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    age: (0, pg_core_1.integer)().notNull(),
    password: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)({ length: 255 }).notNull().unique(),
});
exports.tokensTable = (0, pg_core_1.pgTable)("tokens", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    userId: (0, pg_core_1.integer)().notNull().references(() => exports.usersTable.id),
    token: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    createdAt: (0, pg_core_1.integer)().notNull(),
    expiresAt: (0, pg_core_1.integer)().notNull(),
});
exports.todosTable = (0, pg_core_1.pgTable)("todos", {
    id: (0, pg_core_1.integer)().primaryKey().generatedAlwaysAsIdentity(),
    userId: (0, pg_core_1.integer)().notNull().references(() => exports.usersTable.id),
    task: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    description: (0, pg_core_1.text)().notNull(),
    completed: (0, pg_core_1.boolean)().notNull().default(false),
    remindAt: (0, pg_core_1.timestamp)().notNull(),
    createdAt: (0, pg_core_1.timestamp)().notNull(),
});
