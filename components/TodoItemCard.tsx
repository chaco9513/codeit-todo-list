"use client";

import Image from "next/image";
import Link from "next/link";
import { TodoItem } from "@/types/todo";
import styles from "./TodoItemCard.module.css";

interface TodoItemCardProps {
  todo: TodoItem;
  onToggle: (todo: TodoItem) => Promise<void>;
}

export default function TodoItemCard({ todo, onToggle }: TodoItemCardProps) {
  return (
    <div className={`${styles.card} ${todo.isCompleted ? styles.done : ""}`}>
      <button
        type="button"
        className={styles.checkboxButton}
        onClick={() => onToggle(todo)}
        aria-label="완료 상태 변경"
      >
        <Image
          src={
            todo.isCompleted
              ? "/img/Property 1=Frame 2610233.png"
              : "/img/Ellipse 1.png"
          }
          alt=""
          width={32}
          height={32}
        />
      </button>

      <Link
        href={`/items/${todo.id}`}
        className={`${styles.name} ${
          todo.isCompleted ? styles.lineThrough : ""
        }`}
      >
        {todo.name}
      </Link>
    </div>
  );
}
