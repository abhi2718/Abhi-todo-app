"use client";

import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList, { Task } from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTask: { title: string; description: string }) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...newTask },
    ]);
  }

  return (
    <div
      className="flex flex-col flex-1 items-center font-sans bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: "url('/todo-bg.svg')" }}
    >
      <main className="w-full max-w-2xl py-16 px-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          My Tasks
        </h1>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} />
      </main>
    </div>
  );
}
