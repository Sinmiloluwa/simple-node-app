"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("./todo.controller");
const auth_guard_1 = require("../guards/auth.guard");
const router = express_1.default.Router();
router.post('/create', auth_guard_1.verifyUser, todo_controller_1.createNewTodo);
router.patch('/mark-as-completed/:id', auth_guard_1.verifyUser, todo_controller_1.markAsCompleted);
router.get('/all', auth_guard_1.verifyUser, todo_controller_1.allTodos);
router.delete('/delete/:id', auth_guard_1.verifyUser, todo_controller_1.deleteTodo);
router.get('/:id', auth_guard_1.verifyUser, todo_controller_1.getTodo);
exports.default = router;
