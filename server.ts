import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "@app/db";
import todoRoutes from "@app/routes/todos";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/todos", todoRoutes);

// error handler (keep after routes)
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

const PORT = Number(process.env.PORT) || 4000;

(async () => {
  await connectDB(process.env.MONGO_URI!);
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
