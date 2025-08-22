import { Request, Response, NextFunction } from "express";
import { Task } from "@app/models/Task";

export async function fetchTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const task = await Task.create({ text });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { text, isComplete } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { text, isComplete },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function toggleTaskComplete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Not found" });

    task.isComplete = !task.isComplete;
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function removeTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
