"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import TodoSection from "@/components/TodoSection";
import { createTodo, getTodos, updateTodo } from "@/lib/api";
import { TodoItem } from "@/types/todo";
import styles from "./page.module.css";

export default function HomePage() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ongoingTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  const refreshTodos = async () => {
    try {
      setIsLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
      alert("할 일 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (name: string) => {
    try {
      await createTodo(name);
      await refreshTodos();
    } catch (error) {
      console.error(error);
      alert("할 일 추가에 실패했습니다.");
    }
  };

  const handleToggleTodo = async (todo: TodoItem) => {
    try {
      await updateTodo(todo.id, {
        name: todo.name,
        memo: todo.memo ?? "",
        imageUrl: todo.imageUrl ?? "",
        isCompleted: !todo.isCompleted,
      });

      await refreshTodos();
    } catch (error) {
      console.error(error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error(error);
        alert("할 일 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  return (
    <>
      <Header />

      <main className={styles.main}>
        <TodoInput onAdd={handleAddTodo} />

        {isLoading ? (
          <p className={styles.loading}>불러오는 중...</p>
        ) : (
          <div className={styles.todoGrid}>
            <TodoSection
              type="todo"
              todos={ongoingTodos}
              emptyText={"할 일이 없어요.\nTODO를 새롭게 추가해주세요!"}
              onToggle={handleToggleTodo}
            />

            <TodoSection
              type="done"
              todos={completedTodos}
              emptyText={"아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!"}
              onToggle={handleToggleTodo}
            />
          </div>
        )}
      </main>
    </>
  );
}
