import type { Request, Response, NextFunction } from 'express'

export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = { ...err }
  error.message = err.message

  // Log error
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  })

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any
    switch (prismaError.code) {
      case 'P2002':
        error = new AppError('Unique constraint violation', 400)
        break
      case 'P2025':
        error = new AppError('Record not found', 404)
        break
      default:
        error = new AppError('Database operation failed', 500)
    }
  }

  const statusCode = (error as AppError).statusCode || 500
  const message = error.message || 'Server Error'

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export const createError = (message: string, statusCode: number = 500) => {
  return new AppError(message, statusCode)
}
