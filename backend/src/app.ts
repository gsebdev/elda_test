import express from 'express';
import morgan from 'morgan';
import type { Request, Response } from 'express';
import { errorHandler } from './middleware/error-handler.middleware.js';
import { Logger } from './utils/logger.js';
import employeesRouter from './router/employees.router.js';

const app = express();
const logger = new Logger('App');

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.use('/api', employeesRouter);

// Not Found
app.use((req: Request, res: Response) => {
  logger.warn(`Not found: ${req.method} ${req.path}`);

  res.status(404).json({
    success: false,
    error: 'Route not found',
    statusCode: 404,
    path: req.path,
  });
});

// Error middleware
app.use(errorHandler);

export default app;
