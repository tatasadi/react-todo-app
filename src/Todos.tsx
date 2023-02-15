import { PlusIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoModel } from "./models/TodoModel";
import Todo from "./Todo";

export default function Todos() {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todos") ?? "") ?? [];
    } catch {
      console.error("The todos could not be parsed into JSON.");
      return [];
    }
  });

  const [newTodoDescription, setNewTodoDescription] = useState("");

  useEffect(
    () => localStorage.setItem("todos", JSON.stringify(todos)),
    [todos]
  );

  function handleAdd() {
    const newTodo: TodoModel = {
      id: uuidv4(),
      description: newTodoDescription,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoDescription("");
  }

  function toggleCompleted(todo: TodoModel) {
    const updatedTodo: TodoModel = {
      ...todo,
      completed: !todo.completed,
    };
    setTodos(todos.map((t: TodoModel) => (t.id === todo.id ? updatedTodo : t)));
  }

  function handleDelete(todo: TodoModel) {
    setTodos(todos.filter((t: TodoModel) => t.id !== todo.id));
  }

  return (
    <>
      <section className="bg-white rounded-lg m-6 shadow p-10 max-w-screen-lg lg:mx-auto">
        <h2 className="border-b border-gray-300 pb-2 mb-1">ToDo List</h2>
        <fieldset>
          <legend className="sr-only">Notifications</legend>
          {todos.map((t: TodoModel) => (
            <Todo
              key={t.id}
              todo={t}
              toggleCompleted={toggleCompleted}
              deleteTodo={handleDelete}
            />
          ))}
        </fieldset>
        <div className="py-4 flex gap-4">
          <label htmlFor="newTodo" className="sr-only">
            New ToDo
          </label>
          <input
            type="text"
            name="newTodo"
            id="newTodo"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm disabled:text-gray-300"
            placeholder="Add new ToDo"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
          />
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-full border border-transparent bg-primary-600 p-2 text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
          >
            <PlusIcon
              className="h-5 w-5"
              aria-hidden="true"
              onClick={handleAdd}
            />
          </button>
        </div>
      </section>
    </>
  );
}
