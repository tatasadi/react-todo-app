import Spinner from "./components/Spinner";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./services/todosService";
import { TodoModel } from "./models/TodoModel";
import Todo from "./Todo";

export default function Todos() {
  const initailTodos: TodoModel[] = [];
  const [todos, setTodos] = useState(initailTodos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const response = await getTodos();
        setTodos(response);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (error) throw error;

  async function handleAdd() {
    setAdding(true);
    const newTodo: TodoModel = {
      id: uuidv4(),
      description: newTodoDescription,
      completed: false,
    };
    try {
      await addTodo(newTodo);
    } catch (e: any) {
      setError(e);
    } finally {
      setNewTodoDescription("");
      setTodos([...todos, newTodo]);
      setAdding(false);
    }
  }

  async function toggleCompleted(todo: TodoModel) {
    const updatedTodo: TodoModel = {
      ...todo,
      completed: !todo.completed,
    };
    try {
      await updateTodo(updatedTodo);
    } catch (e: any) {
      setError(e);
    } finally {
      setTodos(
        todos.map((t: TodoModel) => (t.id === todo.id ? updatedTodo : t))
      );
    }
  }

  async function handleDelete(todo: TodoModel) {
    setDeleting(true);
    try {
      await deleteTodo(todo);
    } catch (e: any) {
      setError(e);
    } finally {
      setTodos(todos.filter((t: TodoModel) => t.id !== todo.id));
      setDeleting(false);
    }
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
                deleting={deleting}
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
              disabled={adding}
            />
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-full border border-transparent bg-primary-600 p-2 text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
              disabled={adding}
            >
              <PlusIcon
                className="h-5 w-5"
                aria-hidden="true"
                onClick={handleAdd}
              />
            </button>
          </div>
        </section>
      )}
    </>
  );
}
