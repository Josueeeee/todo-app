import { Router } from "express";
import { createTag, deleteTag, gettags, updateTag } from "../controllers/tag.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();
router.use(authMiddleware);


router.get("/", gettags);
router.post("/", createTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;
