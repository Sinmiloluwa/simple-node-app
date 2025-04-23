import { db } from "../db";
import { todosTable } from "../db/schema";

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

    res.status(201).json({ todo: newTodo });
}