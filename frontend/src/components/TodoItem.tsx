import React, { useState } from 'react';
import { Todo, Category } from '../types';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { toggleTodoComplete, deleteTodo } from '../store/todosSlice';
import TodoForm from './TodoForm';

interface TodoItemProps {
  todo: Todo;
  categories: Category[];
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, categories }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = () => {
    dispatch(toggleTodoComplete({ id: todo.id, completed: todo.completed }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      dispatch(deleteTodo(todo.id));
    }
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  const category = categories.find(c => c.id === todo.categoryId);
  const formattedDueDate = new Date(todo.dueDate).toLocaleDateString();

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <TodoForm
          todo={todo}
          categories={categories}
          onComplete={handleEditComplete}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          id={`todo-${todo.id}`}
        />
        <label htmlFor={`todo-${todo.id}`}></label>
      </div>
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        <p className="todo-description">{todo.description}</p>
        <div className="todo-meta">
          <span className="todo-category">
            📁 {category?.name || 'Unknown'}
          </span>
          <span className="todo-due-date">
            📅 Due: {formattedDueDate}
          </span>
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-secondary"
          title="Edit"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          title="Delete"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
