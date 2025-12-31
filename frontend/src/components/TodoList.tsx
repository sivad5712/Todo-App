import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchTodos } from '../store/todosSlice';
import { fetchCategories } from '../store/categoriesSlice';
import TodoItem from './TodoItem';
import FilterBar from './FilterBar';

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const categories = useAppSelector(state => state.categories.categories);
  const filter = useAppSelector(state => state.todos.filter);
  const sortBy = useAppSelector(state => state.todos.sortBy);
  const loading = useAppSelector(state => state.todos.loading);
  const error = useAppSelector(state => state.todos.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const status = filter === 'all' ? undefined : filter;
    const sort = sortBy === 'none' ? undefined : sortBy;
    dispatch(fetchTodos({ status, sortBy: sort }));
  }, [dispatch, filter, sortBy]);

  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Group todos by category
  const groupedTodos = categories.map(category => ({
    category,
    todos: todos.filter(todo => todo.categoryId === category.id),
  })).filter(group => group.todos.length > 0);

  return (
    <div className="todo-list-container">
      <FilterBar />
      
      {todos.length === 0 ? (
        <div className="empty-state">
          <p>No todos found. Create your first todo above!</p>
        </div>
      ) : (
        <div className="todo-list">
          {groupedTodos.map(({ category, todos: categoryTodos }) => (
            <div key={category.id} className="category-group">
              <h3 className="category-title">
                📁 {category.name} ({categoryTodos.length})
              </h3>
              <div className="category-todos">
                {categoryTodos.map(todo => (
                  <TodoItem key={todo.id} todo={todo} categories={categories} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
