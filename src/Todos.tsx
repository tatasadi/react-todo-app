import useFetch from "./hooks/useFetch";
import Spinner from "./components/Spinner";

export default function Todos() {
  const { data: todos, loading, error } = useFetch("todos");

  if (error) throw error;

  function renderTodo(todo) {
    return (
      <div key={todo.id} className="divide-y divide-gray-200 border-b">
        <div className="relative flex items-start py-4">
          <div className="min-w-0 flex-1 text-sm">
            <label
              htmlFor={`todo-${todo.id}`}
              className="font-medium text-gray-700"
            >
              {todo.title}
            </label>
            <p id={`todo-${todo.id}-description`} className="text-gray-500">
              {todo.description}
            </p>
          </div>
          <div className="ml-3 flex h-5 items-center">
            <input
              id={`todo-${todo.id}`}
              aria-describedby={`todo-${todo.id}-description`}
              name={`todo-${todo.id}`}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    );
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
        </section>
      )}
    </>
  );
}
