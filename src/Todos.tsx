import Spinner from "./components/Spinner";
import { PlusIcon as PlusIconMini } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getTodos, addTodo } from "./services/todosService";
import { Todo } from "./models/Todo";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const response = await getTodos();
        setTodos(response);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (error) throw error;

  function renderTodo(todo: Todo) {
    return (
      <div key={todo.id} className="divide-y divide-gray-200 border-b">
        <div className="relative flex items-start py-4">
          <div className="min-w-0 flex-1 text-sm">
            <label
              htmlFor={`todo-${todo.id}`}
              className="font-medium text-gray-700"
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
            />
          </div>
        </div>
      </div>
    );
  }

  async function handleAddClick() {
    setAdding(true);
    const newTodo: Todo = {
      id: uuidv4(),
      description: newTodoDescription,
      completed: false,
    };
    try {
      const response = await addTodo(newTodo);
      setTodos(response);
    } catch (e) {
      setError(e);
    } finally {
      setNewTodoDescription("");
      setTodos([...todos, newTodo]);
      setAdding(false);
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-white rounded-lg m-10 shadow p-10">
          <h2 className="border-b border-gray-300 pb-2 mb-1">ToDo List</h2>
          <fieldset>
            <legend className="sr-only">Notifications</legend>
            {todos.map(renderTodo)}
          </fieldset>
          <div className="py-4 flex gap-4">
            <label htmlFor="newTodo" className="sr-only">
              Email
            </label>
            <input
              type="text"
              name="newTodo"
              id="newTodo"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm disabled:text-gray-300"
              placeholder="Add new ToDo"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              disabled={adding}
            />
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-full border border-transparent bg-primary-600 p-2 text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
              disabled={adding}
            >
              <PlusIconMini
                className="h-5 w-5"
                aria-hidden="true"
                onClick={handleAddClick}
              />
            </button>
          </div>
        </section>
      )}
    </>
  );
}
