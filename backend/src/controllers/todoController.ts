import { Request, Response } from 'express';
import { db } from '../database/inMemoryDb';
import { CreateTodoDto, UpdateTodoDto } from '../models/Todo';

export class TodoController {
  // Get all todos with optional filtering and sorting
  getAllTodos(req: Request, res: Response): void {
    try {
      let todos = db.getAllTodos();

      // Filter by completion status
      const { status, sortBy } = req.query;
      
      if (status === 'completed') {
        todos = todos.filter(todo => todo.completed === true);
      } else if (status === 'active') {
        todos = todos.filter(todo => todo.completed === false);
      }

      // Sort todos
      if (sortBy === 'dueDate') {
        todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      } else if (sortBy === 'createdAt') {
        todos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }

      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    }
  }

  // Get todos grouped by categories
  getTodosGroupedByCategory(_req: Request, res: Response): void {
    try {
      const categories = db.getAllCategories();
      const grouped = categories.map(category => ({
        category,
        todos: db.getTodosByCategory(category.id),
      }));
      res.json(grouped);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve grouped todos' });
    }
  }

  // Get todo by ID
  getTodoById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const todo = db.getTodoById(id);

      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve todo' });
    }
  }

  // Create new todo
  createTodo(req: Request, res: Response): void {
    try {
      const dto: CreateTodoDto = req.body;

      // Validation
      if (!dto.title || dto.title.trim().length === 0) {
        res.status(400).json({ error: 'Title is required' });
        return;
      }

      if (!dto.description || dto.description.trim().length === 0) {
        res.status(400).json({ error: 'Description is required' });
        return;
      }

      if (!dto.dueDate) {
        res.status(400).json({ error: 'Due date is required' });
        return;
      }

      if (!dto.categoryId || !db.categoryExists(dto.categoryId)) {
        res.status(400).json({ error: 'Valid category ID is required' });
        return;
      }

      const todo = db.createTodo(dto);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  }

  // Update todo
  updateTodo(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const dto: UpdateTodoDto = req.body;

      // Validate category if provided
      if (dto.categoryId && !db.categoryExists(dto.categoryId)) {
        res.status(400).json({ error: 'Invalid category ID' });
        return;
      }

      const updatedTodo = db.updateTodo(id, dto);

      if (!updatedTodo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }

  // Delete todo
  deleteTodo(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const deleted = db.deleteTodo(id);

      if (!deleted) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }
}
