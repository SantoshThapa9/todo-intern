const express = require("express");
const cors = require("cors");
const app = express();

// Middleware setup
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON bodies

// In-memory storage for tasks (in a real app, you'd use a database)
let tasks = [];
let idCounter = 1;

// GET /tasks - get all tasks
app.get("/tasks", (req, res) => {
  try {
    res.json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ error: "Failed to get tasks" });
  }
});

// POST /tasks - add new task
app.post("/tasks", (req, res) => {
  try {
    const { title, completed = false } = req.body;

    // Validate input
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    // Create new task
    const newTask = {
      id: idCounter++,
      title: title.trim(),
      completed,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /tasks/:id - update task (mark as completed/uncompleted)
app.put("/tasks/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Validate completed field
    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({ error: "Completed must be boolean" });
    }

    // Update task
    task.completed = req.body.completed;
    task.updatedAt = new Date().toISOString();

    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /tasks/:id - delete task by id
app.delete("/tasks/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((t) => t.id === id);

    // Check if task exists
    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Remove task from array
    tasks.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Todo API is running",
    taskCount: tasks.length,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API endpoints:`);
  console.log(`   GET    /tasks     - Get all tasks`);
  console.log(`   POST   /tasks     - Create new task`);
  console.log(`   PUT    /tasks/:id - Update task`);
  console.log(`   DELETE /tasks/:id - Delete task`);
});
