import type { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger.js';
import { InternalError } from '../errors/internal-errors.js';

const logger = new Logger('ErrorHandlerMiddleware');

export interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  requestId?: string;
}

export const errorHandler = (
  error: Error | InternalError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const path = req.path;
  const method = req.method;

  // Application error
  if (error instanceof InternalError) {
    logger.warn(`${error.constructor.name} on ${method} ${path}`, {
      message: error.message,
    });

    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
      statusCode: error.statusCode,
    } as ErrorResponse);
  }

  // Unknown error
  logger.error(`Unexpected error on ${method} ${path}`, error);

  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
    statusCode: 500,
    path,
  } as ErrorResponse);
};

// Async route handler wrapper to catch errors
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
