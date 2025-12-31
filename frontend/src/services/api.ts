import axios from 'axios';
import { Todo, Category, CreateTodoDto, UpdateTodoDto, CreateCategoryDto, GroupedTodos } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Todo API
export const todoApi = {
  getAll: async (status?: string, sortBy?: string): Promise<Todo[]> => {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (sortBy && sortBy !== 'none') params.append('sortBy', sortBy);
    const response = await api.get<Todo[]>(`/todos?${params.toString()}`);
    return response.data;
  },

  getGrouped: async (): Promise<GroupedTodos[]> => {
    const response = await api.get<GroupedTodos[]>('/todos/grouped');
    return response.data;
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  create: async (todo: CreateTodoDto): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', todo);
    return response.data;
  },

  update: async (id: string, todo: UpdateTodoDto): Promise<Todo> => {
    const response = await api.put<Todo>(`/todos/${id}`, todo);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};

// Category API
export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  getById: async (id: string): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  },

  create: async (category: CreateCategoryDto): Promise<Category> => {
    const response = await api.post<Category>('/categories', category);
    return response.data;
  },
};
