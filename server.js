const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/database");
const authMiddleware = require("./src/middleware/auth");
const userController = require("./src/controllers/userController");
const taskController = require("./src/controllers/taskController");

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// User routes
app.post("/api/users/register", userController.register);
app.post("/api/users/login", userController.login);

// Task routes (protected)
app.post("/api/tasks", authMiddleware, taskController.createTask);
app.get("/api/tasks", authMiddleware, taskController.getTasks);
app.put("/api/tasks/:id", authMiddleware, taskController.updateTask);
app.delete("/api/tasks/:id", authMiddleware, taskController.deleteTask);

// Start server (Render ready)
const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
