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
exports.deleteTodo = exports.allTodos = exports.markAsCompleted = exports.createNewTodo = void 0;
const todo_service_1 = require("./todo.service");
const response_1 = require("../utils/response");
const todo_schema_1 = require("./validation/todo.schema");
const createNewTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = todo_schema_1.createTodoSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(422).json((0, response_1.validationError)("Validation failed", result.error.flatten().fieldErrors));
        }
        yield (0, todo_service_1.createTodo)(req, res);
        res.status(201).json({ message: "Todo created successfully" });
    }
    catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createNewTodo = createNewTodo;
const markAsCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = req.params.id;
        const userId = req.user.id;
        yield (0, todo_service_1.updateTodoStatus)(todoId, userId);
        res.status(200).json((0, response_1.successResponse)("Todo marked as completed"));
    }
    catch (error) {
        console.error("Error marking todo as completed:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.markAsCompleted = markAsCompleted;
const allTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const todos = yield (0, todo_service_1.getAllTodos)(userId);
        res.status(200).json((0, response_1.successResponse)("Todos fetched successfully", todos));
    }
    catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.allTodos = allTodos;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, todo_service_1.deleteOneTodo)(req.params.id, req.user.id);
        res.status(200).json((0, response_1.successResponse)("Todo deleted successfully"));
    }
    catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteTodo = deleteTodo;
