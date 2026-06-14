"use client";

import Image from "next/image";
import { TodoItem } from "@/types/todo";
import TodoItemCard from "./TodoItemCard";
import styles from "./TodoSection.module.css";

interface TodoSectionProps {
  type: "todo" | "done";
  todos: TodoItem[];
  emptyText: string;
  onToggle: (todo: TodoItem) => Promise<void>;
}

export default function TodoSection({
  type,
  todos,
  emptyText,
  onToggle,
}: TodoSectionProps) {
  const labelSrc = type === "todo" ? "/img/todo.png" : "/img/done.png";

  const emptyLargeSrc =
    type === "todo"
      ? "/img/Type=Todo, Size=Large.png"
      : "/img/Type=Done, Size=Large.png";

  const emptySmallSrc =
    type === "todo"
      ? "/img/Type=todo, Size=Small.png"
      : "/img/Type=Done, Size=Small.png";

  return (
    <section
      className={`${styles.section} ${
        todos.length === 0 ? styles.emptySection : styles.listSection
      }`}
    >
      <Image
        src={labelSrc}
        alt={type === "todo" ? "TO DO" : "DONE"}
        width={type === "todo" ? 101 : 97}
        height={36}
        className={styles.label}
      />

      {todos.length === 0 ? (
        <div className={styles.emptyBox}>
          <picture>
            <source media="(max-width: 743px)" srcSet={emptySmallSrc} />
            <img
              src={emptyLargeSrc}
              alt=""
              className={
                type === "todo" ? styles.emptyTodoImage : styles.emptyDoneImage
              }
            />
          </picture>

          <p className={styles.emptyText}>{emptyText}</p>
        </div>
      ) : (
        <div className={styles.list}>
          {todos.map((todo) => (
            <TodoItemCard key={todo.id} todo={todo} onToggle={onToggle} />
          ))}
        </div>
      )}
    </section>
  );
}
