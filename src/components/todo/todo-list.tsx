"use client";

import { Todo, TodoStatus } from "@/app/types/todo";
import TodoItem from "./todo-item";
import { useState, useMemo } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<TodoStatus>("all");

  const toggleFilter = (value: TodoStatus) => {
    setFilter((prevFilter) => (prevFilter === value ? "all" : value));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "uncompleted":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const createTodo = () => {
    if (!title.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: title.trim(),
        completed: false,
      },
    ]);
    setTitle("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, data: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo)),
    );
  };

  const filterClass = (status: TodoStatus) =>
    `rounded-lg border border-gray-300 p-2 ${
      filter === status ? "border-blue-500" : ""
    }`;

  return (
    <div className="flex w-1/2 flex-col gap-4 rounded-xl bg-white p-5">
      <h1 className="text-3xl">Todo List</h1>

      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          className="rounded-lg border border-gray-300 p-2"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <div
          className={filterClass("completed")}
          onClick={() => toggleFilter("completed")}
        >
          Show completed
        </div>
        <div
          className={filterClass("uncompleted")}
          onClick={() => toggleFilter("uncompleted")}
        >
          Show uncompleted
        </div>
      </div>

      <button
        onClick={createTodo}
        className="rounded-xl bg-blue-500 p-2 text-white"
      >
        Create Todo
      </button>

      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
}
