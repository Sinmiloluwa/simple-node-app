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
exports.createTodo = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, remind_at, description } = req.body;
    const newTodo = yield db_1.db.insert(schema_1.todosTable).values({
        task,
        userId: req.user.id,
        completed: false,
        description: description,
        remindAt: new Date(remind_at),
        createdAt: new Date(),
    }).returning();
    res.status(201).json({ todo: newTodo });
});
exports.createTodo = createTodo;
