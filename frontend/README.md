# Todo Application - Frontend

This is the frontend interface for the Todo Application, built as part of the ECHO technical assessment.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **CSS3** - Modern styling

## Features

- ✅ Create, read, update, and delete todos
- 📁 Organize todos with categories
- 🔍 Filter todos by completion status (all, active, completed)
- 📊 Sort todos by due date or creation date
- 👁️ View todos grouped by categories
- ✏️ Inline editing of todo items
- 📱 Responsive design for all screen sizes
- 🎨 Clean, modern user interface
- ⚡ Real-time state management with Redux Toolkit
- 🔄 Async operations with proper loading states

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/          # React components
│   │   ├── TodoItem.tsx
│   │   ├── TodoForm.tsx
│   │   ├── TodoList.tsx
│   │   ├── CategoryForm.tsx
│   │   └── FilterBar.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAppDispatch.ts
│   │   └── useAppSelector.ts
│   ├── services/           # API service layer
│   │   └── api.ts
│   ├── store/              # Redux store and slices
│   │   ├── index.ts
│   │   ├── todosSlice.ts
│   │   └── categoriesSlice.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx             # Main app component
│   ├── App.css             # App styles
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode (with hot reload)
```bash
npm run dev
```

The application will start on `http://localhost:5173`

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript and create production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## User Stories Implementation

### ✅ Create New Todo
- Form with title, description, due date, and category selection
- Input validation before submission
- Success feedback with immediate UI update

### ✅ Assign Category
- Dropdown selector with all available categories
- Required field in todo creation form

### ✅ View Todos Grouped by Categories
- Main view displays todos organized by their categories
- Each category section shows category name and todo count
- Collapsible category groups for better organization

### ✅ Mark Complete/Incomplete
- Checkbox for each todo item
- Visual indication (strikethrough, opacity) for completed items
- Instant state update

### ✅ Edit Todo
- Inline editing mode for each todo
- Pre-filled form with existing todo data
- Cancel option to discard changes

### ✅ Delete Todo
- Delete button for each todo
- Confirmation dialog before deletion
- Immediate removal from UI

### ✅ Create Categories
- Expandable form for creating new categories
- Simple name input with validation
- New categories immediately available for use

### ✅ Filter by Status
- Three filter options: All, Active, Completed
- Active filter highlighted
- Filtered results update instantly

### ✅ Sort Todos
- Dropdown with sorting options
- Sort by: None, Due Date, Created Date
- Sorted results update instantly

## Component Architecture

### App.tsx
- Main application container
- Manages overall layout
- Displays todo creation, categories, and todo list sections
- Shows statistics (active and completed counts)

### TodoList.tsx
- Displays todos grouped by categories
- Handles filtering and sorting
- Shows loading and error states
- Empty state when no todos exist

### TodoItem.tsx
- Individual todo display
- Toggle completion status
- Inline editing mode
- Delete functionality

### TodoForm.tsx
- Reusable form for create and edit operations
- Input validation
- Category selection
- Date picker for due dates

### CategoryForm.tsx
- Category creation form
- Expandable/collapsible UI
- Name validation

### FilterBar.tsx
- Filter buttons (all, active, completed)
- Sort dropdown
- Dispatches filter/sort actions to Redux

## State Management

### Redux Toolkit Implementation

#### Todos Slice
- State: todos array, loading, error, filter, sortBy
- Actions: setFilter, setSortBy, clearError
- Async Thunks:
  - fetchTodos
  - createTodo
  - updateTodo
  - deleteTodo
  - toggleTodoComplete

#### Categories Slice
- State: categories array, loading, error
- Actions: clearError
- Async Thunks:
  - fetchCategories
  - createCategory

### Custom Hooks
- `useAppDispatch`: Typed dispatch hook
- `useAppSelector`: Typed selector hook

## API Integration

All API calls are handled through the `services/api.ts` module using Axios:

- Base URL: `http://localhost:3000/api`
- Automatic JSON serialization
- Type-safe request/response handling
- Error handling with try/catch

### API Endpoints Used

**Todos:**
- GET `/todos?status={status}&sortBy={sortBy}` - Fetch todos with filters
- GET `/todos/grouped` - Fetch todos grouped by categories
- GET `/todos/:id` - Fetch single todo
- POST `/todos` - Create new todo
- PUT `/todos/:id` - Update todo
- DELETE `/todos/:id` - Delete todo

**Categories:**
- GET `/categories` - Fetch all categories
- GET `/categories/:id` - Fetch single category
- POST `/categories` - Create new category

## Styling

### CSS Architecture
- Global styles in `index.css`
- Component-specific styles in `App.css`
- CSS variables for consistent theming
- Responsive design with media queries
- Modern, clean interface with shadows and transitions

### Design Features
- Color scheme with primary, secondary, success, danger colors
- Card-based layout
- Smooth transitions and hover effects
- Responsive grid and flexbox layouts
- Mobile-first responsive design

### Responsive Breakpoints
- Desktop: > 768px
- Mobile: ≤ 768px

## TypeScript Types

All types are defined in `src/types/index.ts`:

```typescript
interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

type FilterStatus = 'all' | 'active' | 'completed';
type SortBy = 'dueDate' | 'createdAt' | 'none';
```

## Error Handling

- API errors caught and displayed to user
- Form validation before submission
- Loading states during async operations
- User-friendly error messages
- Confirmation dialogs for destructive actions

## Development Notes

### Hot Module Replacement (HMR)
Vite provides instant HMR for a smooth development experience.

### TypeScript Configuration
- Strict mode enabled
- No unused locals/parameters
- Comprehensive type checking

### Code Quality
- ESLint configured with TypeScript support
- React hooks rules enforced
- Consistent code style

## Vite Configuration

The application uses Vite's proxy feature to forward API requests:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

This allows using relative URLs in development while avoiding CORS issues.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS Grid and Flexbox support required

## Performance Optimizations

- Vite's fast build and HMR
- Redux Toolkit's optimized state updates
- React 18's concurrent rendering
- Lazy loading and code splitting ready
- Optimized re-renders with proper memoization

## Future Enhancements

- Drag-and-drop todo reordering
- Search functionality
- Todo priorities
- Dark mode toggle
- Keyboard shortcuts
- Undo/redo functionality
- Export/import todos
- Due date notifications
- Recurring todos
- Todo attachments
- Collaborative features
- Offline support with service workers
- Animations and transitions
- Accessibility improvements (ARIA labels)

## Troubleshooting

### Backend Connection Issues
Ensure the backend server is running on `http://localhost:3000` before starting the frontend.

### Port Already in Use
Change the port in `vite.config.ts`:
```typescript
server: {
  port: 5174, // or any available port
}
```

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## License

ISC

## Author

ECHO Technical Assessment Submission
