import { desc } from "drizzle-orm";
import { pgTable, serial, integer, varchar, boolean, timestamp, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    password: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const tokensTable = pgTable("tokens", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull().references(() => usersTable.id),
    token: varchar({ length: 255 }).notNull(),
    createdAt: integer().notNull(),
    expiresAt: integer().notNull(),
});

export const todosTable = pgTable("todos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull().references(() => usersTable.id),
    task: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    completed: boolean().notNull().default(false),
    remindAt: timestamp().notNull(),
    createdAt: timestamp().notNull(),
});