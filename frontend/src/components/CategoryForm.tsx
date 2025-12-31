import React, { useState, FormEvent } from 'react';
import { CreateCategoryDto } from '../types';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createCategory } from '../store/categoriesSlice';

interface CategoryFormProps {
  onComplete?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onComplete }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter a category name');
      return;
    }

    try {
      const newCategory: CreateCategoryDto = { name: name.trim() };
      await dispatch(createCategory(newCategory)).unwrap();
      setName('');
      setIsExpanded(false);
      onComplete?.();
    } catch (error) {
      console.error('Failed to create category:', error);
      alert('Failed to create category. Please try again.');
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="btn btn-secondary btn-add-category"
      >
        + New Category
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <div className="form-group">
        <label htmlFor="categoryName">Category Name *</label>
        <input
          type="text"
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          autoFocus
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          ✓ Create
        </button>
        <button
          type="button"
          onClick={() => {
            setName('');
            setIsExpanded(false);
          }}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
