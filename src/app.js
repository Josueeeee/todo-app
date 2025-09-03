import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";
import subtaskRoutes from "./routes/subtasks.js";
import tagRoutes from "./routes/tags.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use("/subtasks", subtaskRoutes);
app.use("/tags", tagRoutes);

export default app;
