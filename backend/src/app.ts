import express from 'express';
import morgan from 'morgan';
import type { Request, Response } from 'express';
import { errorHandler } from './middleware/error-handler.middleware.js';
import { Logger } from './utils/logger.js';
import employeesRouter from './router/employees.router.js';
import rolesRouter from './router/roles.router.js';

const app = express();
const logger = new Logger('App');

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    next();
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.use('/api', employeesRouter);
app.use('/api', rolesRouter);

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
