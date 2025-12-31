# Todo Application - Backend API

This is the backend API for the Todo Application, built as part of the ECHO technical assessment.

## Tech Stack

- **Node.js** (v20+)
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **In-Memory Database** - Simple data storage solution

## Features

- RESTful API design
- Full CRUD operations for todos and categories
- Filtering todos by completion status
- Sorting todos by due date or creation date
- Grouping todos by categories
- Input validation and error handling
- TypeScript for type safety
- CORS enabled for frontend integration

## Project Structure

```
backend/
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── todoController.ts
│   │   └── categoryController.ts
│   ├── database/          # In-memory database
│   │   └── inMemoryDb.ts
│   ├── middleware/        # Express middleware
│   │   └── errorHandler.ts
│   ├── models/            # TypeScript interfaces
│   │   ├── Todo.ts
│   │   └── Category.ts
│   ├── routes/            # API routes
│   │   ├── todoRoutes.ts
│   │   └── categoryRoutes.ts
│   └── index.ts           # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
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

#### Build for Production
```bash
npm run build
```

#### Run Production Build
```bash
npm start
```

The server will start on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Health Check
```http
GET /health
```
Returns server health status.

#### Categories

##### Get All Categories
```http
GET /api/categories
```
Returns all categories.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Work",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

##### Get Category by ID
```http
GET /api/categories/:id
```

##### Create Category
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Work"
}
```

#### Todos

##### Get All Todos
```http
GET /api/todos
```

**Query Parameters:**
- `status` (optional): Filter by status
  - `all` - All todos (default)
  - `active` - Only incomplete todos
  - `completed` - Only completed todos
- `sortBy` (optional): Sort todos
  - `dueDate` - Sort by due date
  - `createdAt` - Sort by creation date

**Example:**
```http
GET /api/todos?status=active&sortBy=dueDate
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Complete assessment",
    "description": "Build the todo application",
    "dueDate": "2024-12-31",
    "categoryId": "uuid",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

##### Get Todos Grouped by Category
```http
GET /api/todos/grouped
```

Returns todos organized by their categories.

**Response:**
```json
[
  {
    "category": {
      "id": "uuid",
      "name": "Work",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "todos": [
      {
        "id": "uuid",
        "title": "Complete assessment",
        "description": "Build the todo application",
        "dueDate": "2024-12-31",
        "categoryId": "uuid",
        "completed": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
]
```

##### Get Todo by ID
```http
GET /api/todos/:id
```

##### Create Todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Complete assessment",
  "description": "Build the todo application",
  "dueDate": "2024-12-31",
  "categoryId": "uuid"
}
```

**Validation:**
- `title` - Required, non-empty string
- `description` - Required, non-empty string
- `dueDate` - Required, valid date string
- `categoryId` - Required, must be a valid category ID

##### Update Todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2024-12-31",
  "categoryId": "uuid",
  "completed": true
}
```

All fields are optional. Only provided fields will be updated.

##### Delete Todo
```http
DELETE /api/todos/:id
```

Returns `204 No Content` on success.

### Error Responses

All endpoints return appropriate HTTP status codes and error messages:

**400 Bad Request** - Invalid input
```json
{
  "error": "Title is required"
}
```

**404 Not Found** - Resource not found
```json
{
  "error": "Todo not found"
}
```

**500 Internal Server Error** - Server error
```json
{
  "error": "Internal server error"
}
```

## Data Models

### Todo
```typescript
interface Todo {
  id: string;                // Auto-generated UUID
  title: string;             // Todo title
  description: string;       // Todo description
  dueDate: string;          // ISO date string
  categoryId: string;       // Reference to category
  completed: boolean;       // Completion status
  createdAt: string;        // ISO timestamp
  updatedAt: string;        // ISO timestamp
}
```

### Category
```typescript
interface Category {
  id: string;           // Auto-generated UUID
  name: string;         // Category name
  createdAt: string;    // ISO timestamp
}
```

## In-Memory Database

The application uses an in-memory database for data storage. This means:
- Data is stored in memory during runtime
- Data is lost when the server restarts
- No external database setup required
- Perfect for development and testing

A default "General" category is created on initialization.

## Error Handling

The API implements comprehensive error handling:
- Input validation for all create/update operations
- 404 errors for non-existent resources
- 500 errors for server issues
- Detailed error messages for debugging

## CORS Configuration

CORS is enabled for all origins to allow frontend integration. In production, you should configure specific allowed origins.

## Development Notes

- The server logs all incoming requests with timestamps
- TypeScript strict mode is enabled for maximum type safety
- ESLint is configured for code quality
- The codebase follows TypeScript best practices

## Future Improvements

- Persistent database (PostgreSQL, MongoDB)
- Authentication and authorization
- Pagination for large datasets
- Search functionality
- Todo priorities
- Due date reminders
- Recurring todos
- Tags for todos
- API rate limiting
- Request validation middleware
- Unit and integration tests

## License

ISC

## Author

ECHO Technical Assessment Submission
