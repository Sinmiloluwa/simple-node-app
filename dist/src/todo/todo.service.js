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
exports.oneTodo = exports.deleteOneTodo = exports.getAllTodos = exports.updateTodoStatus = exports.createTodo = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const NotFoundException_1 = require("../exceptions/NotFoundException");
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
    res.status(201).json({ todo: newTodo[0] });
});
exports.createTodo = createTodo;
const updateTodoStatus = (todoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTodo = yield db_1.db
        .update(schema_1.todosTable)
        .set({ completed: true })
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.todosTable.id, todoId), (0, drizzle_orm_1.eq)(schema_1.todosTable.userId, userId)))
        .returning();
    if (updatedTodo.length === 0) {
        throw new Error("Todo not found");
    }
    return updatedTodo[0];
});
exports.updateTodoStatus = updateTodoStatus;
const getAllTodos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield db_1.db
        .select()
        .from(schema_1.todosTable)
        .where((0, drizzle_orm_1.eq)(schema_1.todosTable.userId, userId))
        .orderBy((0, drizzle_orm_1.desc)(schema_1.todosTable.createdAt));
    return todos;
});
exports.getAllTodos = getAllTodos;
const deleteOneTodo = (todoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield db_1.db.select().from(schema_1.todosTable).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.todosTable.id, todoId), (0, drizzle_orm_1.eq)(schema_1.todosTable.userId, userId)));
    if (todo.length === 0) {
        throw new NotFoundException_1.NotFoundException("Todo not found");
    }
    yield db_1.db.delete(schema_1.todosTable).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.todosTable.id, todoId), (0, drizzle_orm_1.eq)(schema_1.todosTable.userId, userId)));
});
exports.deleteOneTodo = deleteOneTodo;
const oneTodo = (todoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield db_1.db
        .select()
        .from(schema_1.todosTable)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.todosTable.id, todoId), (0, drizzle_orm_1.eq)(schema_1.todosTable.userId, userId)));
    console.log(todo);
    return todo[0];
});
exports.oneTodo = oneTodo;
