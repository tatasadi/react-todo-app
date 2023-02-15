import { useState } from "react";
import { classNames } from "./utils";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function Todo({ todo, toggleCompleted, deleteTodo }) {
  const [completed, setCompleted] = useState(todo.completed);

  function handleUnchange() {
    setCompleted((prevCompleted) => !prevCompleted);
    toggleCompleted(todo);
  }

  return (
    <div className="divide-y divide-gray-200 border-b">
      <div className="relative flex items-start py-4">
        <div className="min-w-0 flex-1 text-sm">
          <label
            htmlFor={`todo-${todo.id}`}
            className={classNames(
              completed ? "line-through text-gray-400" : "",
              "font-medium text-gray-700"
            )}
          >
            {todo.description}
          </label>
        </div>
        <div className="ml-3 flex h-5 items-center">
          <input
            id={`todo-${todo.id}`}
            aria-describedby={`todo-${todo.id}-description`}
            name={`todo-${todo.id}`}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            checked={completed}
            onChange={handleUnchange}
          />
        </div>
        <button
          type="button"
          className="ml-3 inline-flex items-centerp-2 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:text-gray-300 disabled:hover:cursor-not-allowed"
        >
          <TrashIcon
            className="h-5 w-5"
            aria-hidden="true"
            onClick={() => deleteTodo(todo)}
          />
        </button>
      </div>
    </div>
  );
}
