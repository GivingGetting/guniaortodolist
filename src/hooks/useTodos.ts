import { useState, useCallback, useMemo } from "react";
import type { FilterType } from "@/components/TodoFilter";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

const STORAGE_KEY = "lovable-todos";

const loadTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((todo: Todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
    }
  } catch (e) {
    console.error("Failed to load todos:", e);
  }
  return [];
};

const saveTodos = (todos: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error("Failed to save todos:", e);
  }
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = useCallback((text: string, dueDate?: Date) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
      dueDate,
    };
    setTodos((prev) => {
      const updated = [newTodo, ...prev];
      saveTodos(updated);
      return updated;
    });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos(updated);
      return updated;
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.filter((todo) => todo.id !== id);
      saveTodos(updated);
      return updated;
    });
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    counts,
  };
};
