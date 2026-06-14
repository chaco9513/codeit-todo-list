"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { deleteTodo, getTodo, updateTodo, uploadImage } from "@/lib/api";
import { TodoItem } from "@/types/todo";
import styles from "./DetailPage.module.css";

export default function TodoDetailPage() {
  const params = useParams();
  const router = useRouter();

  const itemId = Number(params.itemId);

  const [todo, setTodo] = useState<TodoItem | null>(null);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateImageFile = (file: File) => {
    const isEnglishOnly = /^[a-zA-Z0-9_.-]+$/.test(file.name);
    const isUnder5MB = file.size <= 5 * 1024 * 1024;

    if (!isEnglishOnly) {
      alert("이미지 파일 이름은 영어, 숫자, _, ., - 만 사용할 수 있습니다.");
      return false;
    }

    if (!isUnder5MB) {
      alert("이미지 파일 크기는 5MB 이하여야 합니다.");
      return false;
    }

    return true;
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!validateImageFile(file)) {
      e.target.value = "";
      return;
    }

    try {
      const result = await uploadImage(file);
      setImageUrl(result.url);
    } catch (error) {
      console.error(error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      alert("할 일 이름을 입력해주세요.");
      return;
    }

    try {
      await updateTodo(itemId, {
        name: name.trim(),
        memo,
        imageUrl,
        isCompleted,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("정말 삭제하시겠습니까?");

    if (!confirmed) return;

    try {
      await deleteTodo(itemId);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    const loadTodo = async () => {
      if (Number.isNaN(itemId)) return;

      try {
        setIsLoading(true);

        const data = await getTodo(itemId);

        setTodo(data);
        setName(data.name);
        setMemo(data.memo ?? "");
        setImageUrl(data.imageUrl ?? "");
        setIsCompleted(data.isCompleted);
      } catch (error) {
        console.error(error);
        alert("할 일 정보를 불러오지 못했습니다.");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    loadTodo();
  }, [itemId, router]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <p className={styles.loading}>불러오는 중...</p>
        </main>
      </>
    );
  }

  if (!todo) {
    return null;
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <section
          className={`${styles.titleBox} ${
            isCompleted ? styles.titleBoxDone : ""
          }`}
        >
          <button
            type="button"
            className={styles.checkButton}
            onClick={() => setIsCompleted((prev) => !prev)}
            aria-label="완료 상태 변경"
          >
            <Image
              src={
                isCompleted
                  ? "/img/Property 1=Frame 2610233.png"
                  : "/img/Ellipse 1.png"
              }
              alt=""
              width={32}
              height={32}
            />
          </button>

          <input
            className={styles.titleInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.imageBox}>
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt="첨부 이미지"
                  className={styles.preview}
                />

                <label className={styles.editImageButton}>
                  <Image
                    src="/img/edit.png"
                    alt="이미지 수정"
                    width={24}
                    height={24}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={handleImageChange}
                  />
                </label>
              </>
            ) : (
              <>
                <div className={styles.emptyImageBox}>
                  <Image src="/img/img.png" alt="" width={64} height={64} />
                </div>

                <label className={styles.addImageButton}>
                  <Image
                    src="/img/Type=Plus.png"
                    alt="이미지 추가"
                    width={56}
                    height={56}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={handleImageChange}
                  />
                </label>
              </>
            )}
          </div>

          <div className={styles.memoBox}>
            <p className={styles.memoTitle}>Memo</p>

            <textarea
              className={styles.memoTextarea}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력해주세요."
            />
          </div>
        </section>

        <section className={styles.buttonBox}>
          <button
            type="button"
            onClick={handleUpdate}
            className={styles.imageButton}
          >
            <Image
              src="/img/Type=Edit, Size=Large, State=Default.png"
              alt="수정 완료"
              width={168}
              height={56}
            />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className={styles.imageButton}
          >
            <Image
              src="/img/Type=Delete, Size=Large, State=Default.png"
              alt="삭제하기"
              width={168}
              height={56}
            />
          </button>
        </section>
      </main>
    </>
  );
}
