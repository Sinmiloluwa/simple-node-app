import { createTodo, updateTodoStatus, getAllTodos, deleteOneTodo, oneTodo } from "./todo.service";
import { errorResponse, successResponse, validationError } from "../utils/response";
import { createTodoSchema } from "./validation/todo.schema";

export const createNewTodo = async (req: any, res: any): Promise<void> => {
    try {
        const result = createTodoSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(422).json(validationError("Validation failed", result.error.flatten().fieldErrors));
        }

        await createTodo(req, res);
        res.status(201).json({ message: "Todo created successfully" });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const markAsCompleted = async (req: any, res: any): Promise<void> => {
    try {
        const todoId = req.params.id;
        const userId = req.user.id;

        await updateTodoStatus(todoId, userId);
        res.status(200).json(successResponse("Todo marked as completed"));
        
    } catch (error) {
        console.error("Error marking todo as completed:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const allTodos = async (req: any, res: any): Promise<void> => {   
    try {
        const userId = req.user.id

        const todos = await getAllTodos(userId);
        res.status(200).json(successResponse("Todos fetched successfully", todos));
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteTodo = async (req: any, res: any): Promise<void> => {
    try {
        await deleteOneTodo(req.params.id, req.user.id);
        res.status(200).json(successResponse("Todo deleted successfully"));
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getTodo = async (req: any, res: any): Promise<void> => {
    try {
        const todoId = req.params.id;
        const userId = req.user.id;

        const todo = await oneTodo(todoId, userId);
        if (!todo) {
            return res.status(404).json(errorResponse("Todo not found"));
        }

        res.status(200).json(successResponse("Todo fetched successfully", todo));
    } catch (error) {
        console.error("Error fetching todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}