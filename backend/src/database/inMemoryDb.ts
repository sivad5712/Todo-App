import { v4 as uuidv4 } from 'uuid';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/Todo';
import { Category, CreateCategoryDto } from '../models/Category';

class InMemoryDatabase {
  private todos: Map<string, Todo> = new Map();
  private categories: Map<string, Category> = new Map();

  constructor() {
    // Initialize with default categories
    const defaultCategory: Category = {
      id: uuidv4(),
      name: 'General',
      createdAt: new Date().toISOString(),
    };
    this.categories.set(defaultCategory.id, defaultCategory);

    const workCategory: Category = {
      id: uuidv4(),
      name: 'Work',
      createdAt: new Date().toISOString(),
    };
    this.categories.set(workCategory.id, workCategory);

    const personalCategory: Category = {
      id: uuidv4(),
      name: 'Personal',
      createdAt: new Date().toISOString(),
    };
    this.categories.set(personalCategory.id, personalCategory);

    // Initialize with sample todos to demonstrate features
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const sampleTodos: Todo[] = [
      {
        id: uuidv4(),
        title: 'Review code pull requests',
        description: 'Review and approve pending PRs from the team',
        dueDate: tomorrow.toISOString(),
        categoryId: workCategory.id,
        completed: false,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Setup development environment',
        description: 'Install Node.js, npm, and configure TypeScript',
        dueDate: now.toISOString(),
        categoryId: workCategory.id,
        completed: true,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, and vegetables',
        dueDate: tomorrow.toISOString(),
        categoryId: personalCategory.id,
        completed: false,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Complete React documentation',
        description: 'Write comprehensive README for the todo app',
        dueDate: nextWeek.toISOString(),
        categoryId: workCategory.id,
        completed: false,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Schedule dentist appointment',
        description: 'Annual checkup and cleaning',
        dueDate: nextWeek.toISOString(),
        categoryId: personalCategory.id,
        completed: false,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      },
    ];

    sampleTodos.forEach(todo => this.todos.set(todo.id, todo));
  }

  // Category Operations
  getAllCategories(): Category[] {
    return Array.from(this.categories.values());
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.get(id);
  }

  createCategory(dto: CreateCategoryDto): Category {
    const category: Category = {
      id: uuidv4(),
      name: dto.name,
      createdAt: new Date().toISOString(),
    };
    this.categories.set(category.id, category);
    return category;
  }

  categoryExists(id: string): boolean {
    return this.categories.has(id);
  }

  // Todo Operations
  getAllTodos(): Todo[] {
    return Array.from(this.todos.values());
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  createTodo(dto: CreateTodoDto): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: uuidv4(),
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      categoryId: dto.categoryId,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    this.todos.set(todo.id, todo);
    return todo;
  }

  updateTodo(id: string, dto: UpdateTodoDto): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) {
      return undefined;
    }

    const updatedTodo: Todo = {
      ...todo,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  deleteTodo(id: string): boolean {
    return this.todos.delete(id);
  }

  getTodosByCategory(categoryId: string): Todo[] {
    return this.getAllTodos().filter(todo => todo.categoryId === categoryId);
  }

  getTodosByStatus(completed: boolean): Todo[] {
    return this.getAllTodos().filter(todo => todo.completed === completed);
  }
}

export const db = new InMemoryDatabase();
