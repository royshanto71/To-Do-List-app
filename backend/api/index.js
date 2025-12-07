import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from '../src/routes/auth.routes.js';
import taskRoutes from '../src/routes/task.routes.js';
import { errorHandler, notFoundHandler } from '../src/middleware/errorHandler.js';

// Import database to initialize connection
import '../src/config/database.js';

const app = express();

// CORS Configuration - Allow all origins for Vercel
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'To-Do List API',
    version: '1.0.0'
  });
});

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Export for Vercel serverless
export default app;
