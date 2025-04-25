import express from 'express';
import { createNewTodo, markAsCompleted, allTodos, deleteTodo } from './todo.controller';
import { verifyUser } from '../guards/auth.guard';

const router = express.Router();

router.post('/create', verifyUser, createNewTodo);
router.patch('/mark-as-completed/:id', verifyUser, markAsCompleted);
router.get('/all', verifyUser, allTodos)
router.delete('/delete/:id', verifyUser, deleteTodo);
export default router;