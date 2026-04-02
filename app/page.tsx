"use client";

import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const initialTodos = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Walk the dog", completed: true },
  { id: 3, title: "Read a book", completed: false },
  { id: 4, title: "Write unit tests", completed: false },
  { id: 5, title: "Clean the kitchen", completed: true },
] as const;

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([...initialTodos.map((t) => ({ ...t }))]);
  const [newTodo, setNewTodo] = useState("");

  function addTodo() {
    const title = newTodo.trim();
    if (!title) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), title, completed: false },
    ]);
    setNewTodo("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-2xl py-16 px-6">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50 mb-2">
          All Todos
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          {completed} of {todos.length} completed
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          className="flex gap-2 mb-8"
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 h-11 rounded-lg border border-zinc-200 bg-white px-4 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:ring-zinc-50"
          />
          <button
            type="submit"
            className="h-11 rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-300"
          >
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="text-center text-zinc-400 dark:text-zinc-500 py-12">
            No todos yet. Add one above!
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 px-4 py-3 group"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    todo.completed
                      ? "border-zinc-900 bg-zinc-900 dark:border-zinc-50 dark:bg-zinc-50"
                      : "border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500"
                  }`}
                  aria-label={
                    todo.completed
                      ? `Mark "${todo.title}" incomplete`
                      : `Mark "${todo.title}" complete`
                  }
                >
                  {todo.completed && (
                    <svg
                      className="h-3 w-3 text-white dark:text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className={`flex-1 text-sm ${
                    todo.completed
                      ? "text-zinc-400 line-through dark:text-zinc-500"
                      : "text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-zinc-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Delete "${todo.title}"`}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
