import { Router } from "express";
import {
  fetchTasks,
  createTask,
  updateTask,
  removeTask,
} from "@app/controllers/todoController";

const router = Router();

router.get("/", fetchTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", removeTask);

export default router;
