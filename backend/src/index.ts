import express, { Application } from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/categories', categoryRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Todo API Server is running on port ${PORT}`);
  console.log(`📍 API endpoints:`);
  console.log(`   - GET    /api/todos (Query params: ?status=all|active|completed&sortBy=dueDate|createdAt)`);
  console.log(`   - GET    /api/todos/grouped`);
  console.log(`   - GET    /api/todos/:id`);
  console.log(`   - POST   /api/todos`);
  console.log(`   - PUT    /api/todos/:id`);
  console.log(`   - DELETE /api/todos/:id`);
  console.log(`   - GET    /api/categories`);
  console.log(`   - GET    /api/categories/:id`);
  console.log(`   - POST   /api/categories`);
  console.log(`   - GET    /health`);
  console.log(`\n✨ Ready to accept requests!\n`);
});

export default app;
