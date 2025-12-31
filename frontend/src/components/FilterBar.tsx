import React from 'react';
import { FilterStatus, SortBy } from '../types';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setFilter, setSortBy } from '../store/todosSlice';

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.todos.filter);
  const sortBy = useAppSelector(state => state.todos.sortBy);

  const handleFilterChange = (newFilter: FilterStatus) => {
    dispatch(setFilter(newFilter));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as SortBy));
  };

  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        <label>Filter:</label>
        <button
          className={`btn ${filter === 'all' ? 'btn-active' : 'btn-secondary'}`}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={`btn ${filter === 'active' ? 'btn-active' : 'btn-secondary'}`}
          onClick={() => handleFilterChange('active')}
        >
          Active
        </button>
        <button
          className={`btn ${filter === 'completed' ? 'btn-active' : 'btn-secondary'}`}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
      </div>

      <div className="sort-select">
        <label htmlFor="sortBy">Sort by:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="dueDate">Due Date</option>
          <option value="createdAt">Created Date</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
