import { Router } from "express";
import { getTodos, createTodo, addTagToTodo, updateTodo, deleteTodo } from "../controllers/todo.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.use(authMiddleware);

router.get("/", getTodos);
router.post("/", createTodo);
router.post("/add-tag", addTagToTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
