import express from 'express';
import { createNewTodo } from './todo.controller';
import { verifyUser } from '../guards/auth.guard';

const router = express.Router();

router.post('/create', verifyUser, createNewTodo);

export default router;