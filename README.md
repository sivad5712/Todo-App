# Full-Stack Todo Application

> A modern, full-stack todo application built with TypeScript, Node.js, Express.js, React, and Redux Toolkit. This project demonstrates RESTful API design, state management, and modern frontend development practices.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Testing the Application](#testing-the-application)
- [Troubleshooting](#troubleshooting)
- [Development Scripts](#development-scripts)

---

## 🎯 Overview

This todo application is a full-stack TypeScript project showcasing modern web development practices. It allows users to manage tasks across multiple categories with features like filtering, sorting, and real-time updates. The application consists of:

- **Backend API**: RESTful API built with Node.js, Express.js, and TypeScript
- **Frontend UI**: React application with Redux Toolkit for state management, built with Vite
- **In-Memory Database**: Fast, lightweight data persistence for demonstration purposes

The application comes pre-loaded with **sample data** so you can immediately see all features in action!

---

## ✨ Features

### ✅ Core Functionality

- **Create Todos**: Add new tasks with title, description, and due date
- **Assign Categories**: Organize todos by categories (Work, Personal, General, etc.)
- **View & Filter**: See all todos grouped by categories or filtered by status
- **Mark Complete**: Toggle completion status with a single click
- **Edit Todos**: Update any todo's details inline
- **Delete Todos**: Remove todos you no longer need
- **Create Categories**: Add custom categories for better organization

### 🎨 Advanced Features

- **Filter by Status**: View all todos, only active ones, or completed ones
- **Sort Options**: Sort todos by due date or creation date
- **Real-time Statistics**: See active vs completed task counts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth interactions
- **Type Safety**: Full TypeScript coverage on both frontend and backend

---

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Data Storage**: In-memory database (Map-based)
- **Utilities**: UUID for ID generation, CORS for cross-origin requests

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (for fast development and optimized builds)
- **State Management**: Redux Toolkit
- **Async Operations**: Redux Thunk
- **HTTP Client**: Axios
- **Styling**: Custom CSS with modern design patterns

### Development Tools
- **Linting**: ESLint with TypeScript support
- **Type Checking**: TypeScript compiler
- **Package Management**: npm workspaces (monorepo)
- **Process Management**: nodemon for backend hot-reload

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (version 18.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   
2. **npm** (version 8.0 or higher, comes with Node.js)
   - Verify installation: `npm --version`

### Quick Check

Run these commands to verify your environment:

```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 8.0.0 or higher
```

---

## 🚀 Installation & Setup

Follow these steps to get the application running on your local machine:

### Step 1: Download or Clone the Project

If you received this as a zip file, extract it to your desired location. If it's a Git repository:

```bash
git clone <repository-url>
cd todo_assessment
```

### Step 2: Install Dependencies

The project uses npm workspaces to manage both backend and frontend dependencies. From the root directory, run:

```bash
npm install
```

This single command will:
- Install root-level dependencies
- Install all backend dependencies
- Install all frontend dependencies

**Expected output**: You should see installation progress for both `backend` and `frontend` workspaces.

---

## 🎮 Running the Application

You have two options: run both servers with one command, or run them separately.

### Option 1: Run Everything Together (Recommended)

From the **root directory**, run:

```bash
npm run dev
```

This will start both the backend API server and the frontend development server concurrently.

### Option 2: Run Separately

If you prefer to run them in separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### ✅ What You Should See

**Backend Console:**
```
🚀 Todo API Server is running on port 3000
📍 API endpoints:
   - GET    /api/todos
   - POST   /api/todos
   - ...
✨ Ready to accept requests!
```

**Frontend Console:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### 🌐 Access the Application

Once both servers are running:

1. **Open your browser** and navigate to: **http://localhost:5173**
2. You should immediately see the Todo Application with **sample data already loaded**
3. The frontend (port 5173) communicates with the backend API (port 3000)

---

## 📁 Project Structure

```
todo_assessment/
├── backend/                      # Backend API Server
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   │   ├── todoController.ts       # Todo CRUD operations
│   │   │   └── categoryController.ts   # Category operations
│   │   ├── database/
│   │   │   └── inMemoryDb.ts    # In-memory data storage
│   │   ├── middleware/
│   │   │   └── errorHandler.ts  # Error handling middleware
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── Todo.ts          # Todo type definitions
│   │   │   └── Category.ts      # Category type definitions
│   │   ├── routes/              # API route definitions
│   │   │   ├── todoRoutes.ts
│   │   │   └── categoryRoutes.ts
│   │   └── index.ts             # Express server entry point
│   ├── dist/                     # Compiled JavaScript (generated)
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── TodoForm.tsx     # Form to create todos
│   │   │   ├── TodoItem.tsx     # Individual todo display
│   │   │   ├── TodoList.tsx     # List of todos
│   │   │   └── CategoryForm.tsx # Form to create categories
│   │   ├── store/               # Redux state management
│   │   │   ├── store.ts         # Redux store configuration
│   │   │   ├── todosSlice.ts    # Todo state and actions
│   │   │   └── categoriesSlice.ts
│   │   ├── services/
│   │   │   └── api.ts           # Axios API client
│   │   ├── hooks/               # Custom React hooks
│   │   ├── App.tsx              # Main application component
│   │   ├── App.css              # Application styles
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── dist/                     # Production build (generated)
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
├── package.json                  # Root workspace configuration
├── .gitignore
└── README.md                     # This file
```

---

## 📚 API Documentation

The backend API provides the following endpoints:

### Todo Endpoints

#### `GET /api/todos`
Get all todos with optional filtering and sorting.

**Query Parameters:**
- `status`: `all` (default), `active`, or `completed`
- `sortBy`: `createdAt` (default) or `dueDate`

**Example:**
```bash
curl http://localhost:3000/api/todos?status=active&sortBy=dueDate
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Review code pull requests",
    "description": "Review and approve pending PRs from the team",
    "dueDate": "2025-01-15T10:00:00.000Z",
    "categoryId": "uuid",
    "completed": false,
    "createdAt": "2025-01-10T10:00:00.000Z",
    "updatedAt": "2025-01-10T10:00:00.000Z"
  }
]
```

#### `GET /api/todos/grouped`
Get all todos grouped by their categories.

**Response:**
```json
[
  {
    "category": {
      "id": "uuid",
      "name": "Work",
      "createdAt": "2025-01-10T10:00:00.000Z"
    },
    "todos": [...]
  }
]
```

#### `GET /api/todos/:id`
Get a specific todo by ID.

#### `POST /api/todos`
Create a new todo.

**Request Body:**
```json
{
  "title": "New Todo",
  "description": "Description of the todo",
  "dueDate": "2025-01-15T10:00:00.000Z",
  "categoryId": "uuid"
}
```

#### `PUT /api/todos/:id`
Update an existing todo.

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "dueDate": "2025-01-20T10:00:00.000Z",
  "completed": true
}
```

#### `DELETE /api/todos/:id`
Delete a todo.

### Category Endpoints

#### `GET /api/categories`
Get all categories.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Work",
    "createdAt": "2025-01-10T10:00:00.000Z"
  }
]
```

#### `GET /api/categories/:id`
Get a specific category by ID.

#### `POST /api/categories`
Create a new category.

**Request Body:**
```json
{
  "name": "Personal"
}
```

### Health Check

#### `GET /health`
Check if the API server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-10T10:00:00.000Z"
}
```

---

## 📖 Usage Guide

Here's how to use all the features of the application:

### 1. Viewing Todos

When you first open the application, you'll see:
- **Statistics bar** at the top showing active vs completed todos
- **Filter buttons** to view All, Active, or Completed todos
- **Sort dropdown** to sort by due date or creation date
- **Todo list** grouped by categories

### 2. Creating a New Todo

1. Look for the "Add New Todo" form at the top
2. Fill in:
   - **Title** (required): Short name for your task
   - **Description** (required): Details about the task
   - **Due Date** (required): When the task should be completed
   - **Category** (required): Select from dropdown or create a new one
3. Click **"Add Todo"** button
4. Your new todo appears in the list immediately

### 3. Creating a New Category

1. Find the "Create Category" section
2. Enter a category name (e.g., "Shopping", "Health", "Learning")
3. Click **"Create Category"**
4. The new category is now available in the dropdown when creating todos

### 4. Marking Todos Complete

- Click the **checkbox** next to any todo to mark it complete/incomplete
- Completed todos are styled differently (strikethrough text)
- Use the filter buttons to show only active or completed todos

### 5. Editing a Todo

1. Click the **"Edit"** button on any todo
2. The todo expands to show editable fields
3. Modify any field (title, description, due date)
4. Click **"Save"** to confirm or **"Cancel"** to discard changes

### 6. Deleting a Todo

- Click the **"Delete"** button on any todo
- The todo is immediately removed from the list

### 7. Filtering and Sorting

- **Filter buttons**: Click "All", "Active", or "Completed" to filter the view
- **Sort dropdown**: Choose "Due Date" or "Created Date" to reorder todos
- Filters and sorts work together for precise task management

---

## 🧪 Testing the Application

Here's a workflow to test all features:

### Test Workflow 1: Basic CRUD Operations

1. ✅ **View Sample Data**: Open http://localhost:5173 - you should see pre-loaded todos
2. ✅ **Create a Todo**: Fill the form and add "Test Todo" in "General" category
3. ✅ **Mark Complete**: Click the checkbox on "Test Todo"
4. ✅ **Edit Todo**: Click Edit, change the title, click Save
5. ✅ **Delete Todo**: Click Delete on "Test Todo"

### Test Workflow 2: Categories

1. ✅ **View Categories**: Check the category dropdown - should show General, Work, Personal
2. ✅ **Create Category**: Add a new category called "Urgent"
3. ✅ **Use New Category**: Create a todo and assign it to "Urgent"

### Test Workflow 3: Filtering & Sorting

1. ✅ **Filter Active**: Click "Active" - only incomplete todos should show
2. ✅ **Filter Completed**: Click "Completed" - only completed todos should show
3. ✅ **Sort by Due Date**: Select "Due Date" from dropdown - todos should reorder
4. ✅ **Sort by Created Date**: Select "Created Date" - todos should reorder again

### Test Workflow 4: API Direct Testing

You can also test the API directly using curl or Postman:

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Get all categories
curl http://localhost:3000/api/categories

# Create a new todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "API Test Todo",
    "description": "Testing via curl",
    "dueDate": "2025-12-31T23:59:59.000Z",
    "categoryId": "<paste-a-category-id-here>"
  }'
```

---

## 🔧 Troubleshooting

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Clean install from root directory
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
```

### Issue: Port 3000 or 5173 already in use

**Solution:**

For port 3000 (backend):
```bash
# Find and kill the process on macOS/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

For port 5173 (frontend):
```bash
# Find and kill the process on macOS/Linux
lsof -ti:5173 | xargs kill -9
```

### Issue: Frontend can't connect to backend

**Checklist:**
1. ✅ Ensure backend is running on port 3000
2. ✅ Check backend console shows "Ready to accept requests!"
3. ✅ Try accessing http://localhost:3000/health in your browser
4. ✅ Check browser console for CORS errors
5. ✅ Verify frontend is making requests to correct URL (check `frontend/src/services/api.ts`)

### Issue: TypeScript compilation errors

**Solution:**
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

If errors persist, check for:
- Correct TypeScript version: `npx tsc --version`
- Matching interface definitions between frontend and backend

### Issue: Changes not reflecting

**Backend Solution:**
- The backend uses `nodemon` which should auto-reload
- If not working, stop the server (Ctrl+C) and run `npm run dev` again

**Frontend Solution:**
- Vite has hot module replacement (HMR)
- Try refreshing the browser (F5 or Cmd+R)
- Clear browser cache if needed

### Issue: "npm: command not found"

**Solution:**
- Node.js and npm are not installed or not in PATH
- Reinstall Node.js from https://nodejs.org/
- Verify with `node --version` and `npm --version`

---

## 🛠 Development Scripts

### Root Directory Commands

```bash
# Install all dependencies (backend + frontend)
npm install

# Run both servers concurrently
npm run dev

# Build both projects for production
npm run build

# Run TypeScript type checking on both projects
npm run lint

# Clean all node_modules and dist folders
npm run clean
```

### Backend Commands

```bash
cd backend

# Development mode with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run the compiled production build
npm start

# Run ESLint
npm run lint
```

### Frontend Commands

```bash
cd frontend

# Development mode with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## 🎓 Learning Resources

This project demonstrates several important concepts:

### Backend Concepts
- **RESTful API Design**: Proper HTTP methods, status codes, and resource naming
- **TypeScript with Node.js**: Type-safe backend development
- **Express.js Middleware**: CORS, error handling, JSON parsing
- **Controller Pattern**: Separation of route handling and business logic
- **In-Memory Database**: Using Maps for fast data access

### Frontend Concepts
- **React Hooks**: useState, useEffect, custom hooks
- **Redux Toolkit**: Modern Redux with slices and createAsyncThunk
- **TypeScript with React**: Typed components and props
- **Vite**: Fast build tool and development server
- **Async State Management**: Loading states, error handling
- **Component Composition**: Reusable UI components

---

## 📝 Notes for Reviewers

### Key Implementation Highlights

1. **Type Safety**: Full TypeScript coverage with strict mode enabled
2. **State Management**: Redux Toolkit with proper slice organization
3. **API Design**: RESTful conventions with consistent error handling
4. **Code Organization**: Clear separation of concerns and modular structure
5. **User Experience**: Sample data included for immediate demonstration
6. **Error Handling**: Comprehensive validation and error messages
7. **Modern Tooling**: Vite for frontend, nodemon for backend hot-reload

### Code Quality Practices

- ✅ ESLint configured for code quality
- ✅ TypeScript strict mode enabled
- ✅ Consistent naming conventions
- ✅ Comprehensive inline comments
- ✅ Proper async/await patterns
- ✅ Input validation on both client and server
- ✅ Organized project structure with clear separations

---

## 🚀 Production Considerations

This is a demonstration/assessment project with an in-memory database. For production use, consider:

1. **Database**: Replace in-memory storage with PostgreSQL, MongoDB, or similar
2. **Authentication**: Add user authentication and authorization
3. **Environment Variables**: Use `.env` files for configuration
4. **Testing**: Add unit tests (Jest) and integration tests
5. **Deployment**: Deploy backend to services like AWS, Heroku, or Railway
6. **Frontend Hosting**: Deploy to Vercel, Netlify, or similar
7. **API Security**: Add rate limiting, CORS configuration, input sanitization
8. **Error Tracking**: Integrate Sentry or similar for production error monitoring

---

## 📄 License

This project is for assessment purposes.

---

## 👨‍💻 Author

Created as a technical assessment project demonstrating full-stack TypeScript development skills.

---

## 🙏 Thank You

Thank you for reviewing this project! If you have any questions or run into any issues, please don't hesitate to reach out.

**Happy Coding! 🎉**
