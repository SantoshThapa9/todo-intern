"use client";
import React, { useState, useEffect } from "react";

export default function TodoApp() {
  // State for managing tasks and input
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to get all tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://todo-intern.onrender.com/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const response = await fetch("https://todo-intern.onrender.com/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (response.ok) {
        setTitle("");
        fetchTasks();
      } else {
        alert("Failed to add task. Please try again.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle task completion
  const toggleCompleted = async (task) => {
    try {
      const response = await fetch(`https://todo-intern.onrender.com/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (response.ok) {
        fetchTasks();
      } else {
        alert("Failed to update task. Please try again.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(`https://todo-intern.onrender.com/tasks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTasks();
      } else {
        alert("Failed to delete task. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Todo List
          </h1>
          <p className="text-gray-600">Organize your tasks easily</p>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <form onSubmit={addTask} className="space-y-4">
            <div>
              <label
                htmlFor="taskInput"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Add New Task
              </label>
              <div className="flex gap-2">
                <input
                  id="taskInput"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What do you need to do?"
                  className="flex-1 text-gray-800  px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !title.trim()}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Tasks ({tasks.length})
            </h2>
          </div>

          {loading && tasks.length === 0 ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">No tasks yet!</p>
              <p className="text-gray-400">Add your first task above</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleCompleted(task)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          task.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 hover:border-green-400"
                        }`}
                      >
                        {task.completed && (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>

                      {/* Task Title */}
                      <span
                        className={`flex-1 text-left ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        } transition-all duration-200`}
                      >
                        {task.title}
                      </span>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete task"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Made with ❤️ for organizing your day</p>
          <footer className="  py-3">
            <div className="container mx-auto px-4 flex flex-col  justify-between items-center">
              <p className="text-sm">
                &copy; 2025{" "}
                <a
                  className="hover:underline"
                  href="https://www.santoshthapa.xyz"
                >
                  Santosh Thapa
                </a>
                . All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="hover:underline">
                  Privacy
                </a>
                <a href="#" className="hover:underline">
                  Terms
                </a>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
