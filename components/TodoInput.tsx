"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import styles from "./TodoInput.module.css";

interface TodoInputProps {
  onAdd: (name: string) => Promise<void>;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isActive = value.trim().length > 0;

  const largeButtonSrc = isActive
    ? "/img/Type=Add, Size=Large, State=Active.png"
    : "/img/Type=Add, Size=Large, State=Default.png";

  const smallButtonSrc = isActive
    ? "/img/Type=Add, Size=Small, State=Active.png"
    : "/img/Type=Add, Size=Small, State=Default (1).png";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      alert("할 일을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      await onAdd(trimmedValue);
      setValue("");
    } catch (error) {
      console.error(error);
      alert("할 일 추가에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="할 일을 입력해주세요"
      />

      <button type="submit" disabled={isLoading} className={styles.addButton}>
        <Image src={largeButtonSrc} alt="추가하기" width={168} height={56} />
      </button>

      <button
        type="submit"
        disabled={isLoading}
        className={styles.mobileAddButton}
        aria-label="추가하기"
      >
        <Image src={smallButtonSrc} alt="추가하기" width={56} height={56} />
      </button>
    </form>
  );
}
