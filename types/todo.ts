export interface TodoItem {
  tenantId: string;
  id: number;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}
