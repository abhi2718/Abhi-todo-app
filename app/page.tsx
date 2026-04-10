"use client";
import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div
      className="flex flex-col flex-1 items-center font-sans bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: "url('/todo-bg.svg')" }}
    >
      <main className="w-full max-w-2xl py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Todo App
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          className="flex gap-3 mb-8"
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white/90 text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </form>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-12">
            No tasks yet. Add one above!
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/90 shadow-sm border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span
                  className={`flex-1 text-base ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-xl leading-none px-1"
                  aria-label="Delete task"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {tasks.length > 0 && (
          <p className="text-center text-sm text-gray-500 mt-6">
            {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
            completed
          </p>
        )}
      </main>
    </div>
  );
}
