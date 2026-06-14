import { TodoItem } from "@/types/todo";

const TENANT_ID = "changhyeon-todo";
const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}`;

export async function getTodos(): Promise<TodoItem[]> {
  const res = await fetch(`${BASE_URL}/items`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("할 일 목록 조회 실패");
  }

  return res.json();
}

export async function getTodo(itemId: number): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("할 일 상세 조회 실패");
  }

  return res.json();
}

export async function createTodo(name: string): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error("할 일 추가 실패");
  }

  return res.json();
}

export async function updateTodo(
  itemId: number,
  data: {
    name: string;
    memo: string;
    imageUrl: string;
    isCompleted: boolean;
  },
): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("할 일 수정 실패");
  }

  return res.json();
}

export async function deleteTodo(itemId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("할 일 삭제 실패");
  }
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("이미지 업로드 실패");
  }

  return res.json();
}
