import { createTodo } from "./todo.service";
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