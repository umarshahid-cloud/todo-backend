import { Router } from "express";
import {
  fetchTasks,
  createTask,
  updateTask,
  toggleTaskComplete,
  removeTask,
} from "@app/controllers/todoController";

const router = Router();

router.get("/", fetchTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.patch("/:id/toggle", toggleTaskComplete);
router.delete("/:id", removeTask);

export default router;
