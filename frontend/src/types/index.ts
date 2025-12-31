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

export interface Category {
  id: string;
  name: string;
  createdAt: string;
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

export interface CreateCategoryDto {
  name: string;
}

export interface GroupedTodos {
  category: Category;
  todos: Todo[];
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortBy = 'dueDate' | 'createdAt' | 'none';
