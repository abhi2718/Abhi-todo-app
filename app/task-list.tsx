"use client";

import { useState } from "react";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, description: string) => void;
}

export default function TaskList({ todos, onToggle, onDelete, onEdit }: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function startEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  }

  function saveEdit(id: number) {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    onEdit(id, trimmed, editDescription.trim());
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  if (todos.length === 0) {
    return (
      <p className="text-center text-zinc-500 dark:text-zinc-400 py-8">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="group rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800"
        >
          {editingId === todo.id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded border border-zinc-300 px-3 py-1 text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={2}
                className="w-full rounded border border-zinc-300 px-3 py-1 text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="rounded bg-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-400 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="mt-1 h-4 w-4 rounded border-zinc-300 accent-blue-600"
              />
              <div className="flex-1 min-w-0">
                <span
                  className={`block ${
                    todo.completed
                      ? "text-zinc-400 line-through dark:text-zinc-500"
                      : "text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {todo.title}
                </span>
                {todo.description && (
                  <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {todo.description}
                  </span>
                )}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(todo)}
                  className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-zinc-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-zinc-700"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
