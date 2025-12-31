import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { fetchCategories } from './store/categoriesSlice';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CategoryForm from './components/CategoryForm';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.categories);
  const todos = useAppSelector(state => state.todos.todos);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>✅ Todo Application</h1>
        <p className="subtitle">ECHO Technical Assessment</p>
      </header>

      <main className="app-main">
        <section className="section">
          <div className="section-header">
            <h2>📝 Create New Todo</h2>
            <div className="stats">
              <span className="stat">
                <strong>{activeTodos}</strong> active
              </span>
              <span className="stat">
                <strong>{completedTodos}</strong> completed
              </span>
            </div>
          </div>
          <div className="card">
            <TodoForm categories={categories} />
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>📋 Categories</h2>
            <span className="badge">{categories.length} total</span>
          </div>
          <div className="card">
            <div className="categories-list">
              {categories.map(category => (
                <div key={category.id} className="category-badge">
                  📁 {category.name}
                </div>
              ))}
            </div>
            {showCategoryForm ? (
              <CategoryForm onComplete={() => setShowCategoryForm(false)} />
            ) : (
              <button
                onClick={() => setShowCategoryForm(true)}
                className="btn btn-secondary btn-add-category"
              >
                + New Category
              </button>
            )}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>📋 My Todos</h2>
            <span className="badge">{todos.length} total</span>
          </div>
          <TodoList />
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React, TypeScript, Redux Toolkit, and Express.js</p>
      </footer>
    </div>
  );
}

export default App;
