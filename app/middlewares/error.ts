import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error",
    error: err instanceof Error ? err.message : err,
  });
}
