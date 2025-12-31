import { Request, Response } from 'express';
import { db } from '../database/inMemoryDb';
import { CreateCategoryDto } from '../models/Category';

export class CategoryController {
  // Get all categories
  getAllCategories(_req: Request, res: Response): void {
    try {
      const categories = db.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve categories' });
    }
  }

  // Get category by ID
  getCategoryById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const category = db.getCategoryById(id);

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve category' });
    }
  }

  // Create new category
  createCategory(req: Request, res: Response): void {
    try {
      const dto: CreateCategoryDto = req.body;

      // Validation
      if (!dto.name || dto.name.trim().length === 0) {
        res.status(400).json({ error: 'Category name is required' });
        return;
      }

      const category = db.createCategory(dto);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create category' });
    }
  }
}
