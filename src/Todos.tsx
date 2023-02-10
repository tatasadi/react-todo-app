import Spinner from "./components/Spinner";
import { PlusIcon as PlusIconMini } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getTodos, addTodo, updateTodo } from "./services/todosService";
import { TodoModel } from "./models/TodoModel";
import Todo from "./Todo";

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

  async function handleAddClick() {
    setAdding(true);
    const newTodo: TodoModel = {
      id: uuidv4(),
      description: newTodoDescription,
      completed: false,
    };
    try {
      await addTodo(newTodo);
    } catch (e) {
      setError(e);
    } finally {
      setNewTodoDescription("");
      setTodos([...todos, newTodo]);
      setAdding(false);
    }
  }

  async function handleTodoClick(todo: TodoModel) {
    const updatedTodo: TodoModel = {
      ...todo,
      completed: !todo.completed,
    };
    try {
      await updateTodo(updatedTodo);
    } catch (e) {
      setError(e);
    } finally {
      setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
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
            {todos.map((t: TodoModel) => (
              <Todo key={t.id} todo={t} handleTodoClick={handleTodoClick} />
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
