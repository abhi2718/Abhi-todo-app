"use client";

export interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-4 bg-white/90 rounded-lg border border-gray-200 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
