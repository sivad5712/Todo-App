import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo, CreateTodoDto, UpdateTodoDto, FilterStatus, SortBy } from '../types';
import { todoApi } from '../services/api';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  filter: FilterStatus;
  sortBy: SortBy;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  filter: 'all',
  sortBy: 'none',
};

// Async Thunks
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({ status, sortBy }: { status?: string; sortBy?: string } = {}) => {
    return await todoApi.getAll(status, sortBy);
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo: CreateTodoDto) => {
    return await todoApi.create(todo);
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updates }: { id: string; updates: UpdateTodoDto }) => {
    return await todoApi.update(id, updates);
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string) => {
    await todoApi.delete(id);
    return id;
  }
);

export const toggleTodoComplete = createAsyncThunk(
  'todos/toggleComplete',
  async ({ id, completed }: { id: string; completed: boolean }) => {
    return await todoApi.update(id, { completed: !completed });
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch todos';
    });

    // Create Todo
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create todo';
    });

    // Update Todo
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to update todo';
    });

    // Delete Todo
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to delete todo';
    });

    // Toggle Complete
    builder.addCase(toggleTodoComplete.fulfilled, (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    });
    builder.addCase(toggleTodoComplete.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to toggle todo';
    });
  },
});

export const { setFilter, setSortBy, clearError } = todosSlice.actions;
export default todosSlice.reducer;
