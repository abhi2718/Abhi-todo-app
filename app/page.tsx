"use client";

import { useState } from "react";
import TaskForm from "./task-form";
import TaskList, { type Todo } from "./task-list";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(title: string, description: string) {
    setTodos((prev) => [
      { id: Date.now(), title, description, completed: false },
      ...prev,
    ]);
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id: number, title: string, description: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title, description } : t))
    );
  }

  return (
    <div
      className="flex flex-col flex-1 items-center font-sans bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: "url('/todo-bg.svg')" }}
    >
      <main className="w-full max-w-2xl py-16 px-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 text-center">
          Todo List
        </h1>
        <TaskForm onAdd={addTodo} />
        <TaskList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </main>
    </div>
  );
}
