export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDto {
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  dueDate?: string;
  categoryId?: string;
  completed?: boolean;
}
