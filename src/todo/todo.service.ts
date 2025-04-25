import { db } from "../db";
import { todosTable } from "../db/schema";
import { eq, and, desc } from "drizzle-orm";
import { NotFoundException } from "../exceptions/NotFoundException";

export const createTodo = async (req: any, res: any): Promise<void> => {
    const { task, remind_at, description } = req.body;

    const newTodo = await db.insert(todosTable).values({
        task,
        userId: req.user.id,
        completed: false,
        description: description,
        remindAt: new Date(remind_at),
        createdAt: new Date(),
    }).returning();

    res.status(201).json({ todo: newTodo[0] });
}

export const updateTodoStatus = async (todoId: number, userId: number) => {
    const updatedTodo = await db
        .update(todosTable)
        .set({ completed: true })
        .where(and(eq(todosTable.id, todoId), eq(todosTable.userId, userId)))
        .returning();

    if (updatedTodo.length === 0) {
        throw new Error("Todo not found");
    }

    return updatedTodo[0];
}

export const getAllTodos = async (userId: number) => {
    const todos = await db
        .select()
        .from(todosTable)
        .where(eq(todosTable.userId, userId))
        .orderBy(desc(todosTable.createdAt));

    return todos;
}

export const deleteOneTodo = async (todoId: number, userId: number) => {
    const todo = await db.select().from(todosTable).where(and(eq(todosTable.id, todoId), eq(todosTable.userId, userId)));

    if(todo.length === 0) {
        throw new NotFoundException("Todo not found");
    }
    
    await db.delete(todosTable).where(and(eq(todosTable.id, todoId), eq(todosTable.userId, userId)));
}