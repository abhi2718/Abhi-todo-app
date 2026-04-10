"use client";
import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const initialTodos: Todo[] = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Walk the dog", completed: true },
  { id: 3, title: "Read a book", completed: false },
  { id: 4, title: "Write unit tests", completed: false },
  { id: 5, title: "Clean the kitchen", completed: true },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const title = newTodo.trim();
    if (!title) return;
    setTodos([...todos, { id: Date.now(), title, completed: false }]);
    setNewTodo("");
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div
      className="flex flex-col flex-1 items-center font-sans bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: "url('/todo-bg.svg')" }}
    >
      <main className="w-full max-w-2xl py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Todo App</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white/80 backdrop-blur text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>

        {todos.length > 0 && (
          <p className="text-sm text-gray-600 mb-4">
            {completedCount} of {todos.length} completed
          </p>
        )}

        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No todos yet. Add one above!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-white/80 backdrop-blur transition-colors hover:bg-white/90"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 hover:border-green-400"
                  }`}
                >
                  {todo.completed && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span
                  className={`flex-1 text-gray-900 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                  aria-label="Delete todo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
