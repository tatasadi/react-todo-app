import { Todo } from "../models/TodoModel";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getTodos() {
  const response = await fetch(baseUrl + "todos");
  if (response.ok) return response.json();
  throw response;
}

export async function addTodo(todo: Todo) {
  const response = await fetch(baseUrl + "todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (response.ok) return response.json();
  throw response;
}

export async function updateTodo(todo: Todo) {
  const response = await fetch(`${baseUrl}todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (response.ok) return response.json();
  throw response;
}
