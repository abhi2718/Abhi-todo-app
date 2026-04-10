"use client";

import { useState } from "react";

interface TaskFormProps {
  onAddTask: (task: { title: string; description: string }) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title.trim()}
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
