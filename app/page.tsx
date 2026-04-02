"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  function addTodo() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }]);
    setInput("");
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function startEditing(todo: Todo) {
    setEditingId(todo.id);
    setEditText(todo.text);
  }

  function saveEdit(id: number) {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
    setEditingId(null);
    setEditText("");
  }

  function toggleComplete(id: number) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 pt-20 font-sans dark:bg-black">
      <main className="w-full max-w-lg rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
        <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Todo App
        </h1>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new todo..."
            className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-500"
          />
          <button
            onClick={addTodo}
            className="rounded-lg bg-zinc-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="py-8 text-center text-zinc-400 dark:text-zinc-500">
            No todos yet. Add one above!
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3 dark:border-zinc-800"
              >
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(todo.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      autoFocus
                      className="flex-1 rounded border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-400"
                    />
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="rounded px-3 py-1.5 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded px-3 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="h-4 w-4 shrink-0 accent-zinc-900 dark:accent-zinc-50"
                    />
                    <span
                      className={`flex-1 ${
                        todo.completed
                          ? "text-zinc-400 line-through dark:text-zinc-500"
                          : "text-zinc-900 dark:text-zinc-50"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => startEditing(todo)}
                      className="rounded px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="rounded px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
