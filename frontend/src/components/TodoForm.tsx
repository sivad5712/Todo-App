import React, { useState, FormEvent } from 'react';
import { Category, Todo, CreateTodoDto, UpdateTodoDto } from '../types';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createTodo, updateTodo } from '../store/todosSlice';

interface TodoFormProps {
  todo?: Todo;
  categories: Category[];
  onComplete?: () => void;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, categories, onComplete, onCancel }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    dueDate: todo?.dueDate?.split('T')[0] || '',
    categoryId: todo?.categoryId || categories[0]?.id || '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.dueDate || !formData.categoryId) {
      alert('Please fill in all fields');
      return;
    }

    try {
      if (todo) {
        // Update existing todo
        const updates: UpdateTodoDto = {
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate,
          categoryId: formData.categoryId,
        };
        await dispatch(updateTodo({ id: todo.id, updates })).unwrap();
      } else {
        // Create new todo
        const newTodo: CreateTodoDto = {
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate,
          categoryId: formData.categoryId,
        };
        await dispatch(createTodo(newTodo)).unwrap();
      }

      // Reset form if creating new todo
      if (!todo) {
        setFormData({
          title: '',
          description: '',
          dueDate: '',
          categoryId: categories[0]?.id || '',
        });
      }

      onComplete?.();
    } catch (error) {
      console.error('Failed to save todo:', error);
      alert('Failed to save todo. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter todo title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter todo description"
          rows={3}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dueDate">Due Date *</label>
          <input
            type="date"
            id="dueDate"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Category *</label>
          <select
            id="categoryId"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            required
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {todo ? '✓ Update Todo' : '+ Add Todo'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
