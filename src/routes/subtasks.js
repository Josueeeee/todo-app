import { Router } from "express";
import { createSubtask, deleteSubtask, getSubtask, updateSubtask } from "../controllers/subtask.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.use(authMiddleware);

router.get("/", getSubtask);
router.post("/", createSubtask);
router.put("/:id", updateSubtask );
router.delete("/:id", deleteSubtask);

export default router;
