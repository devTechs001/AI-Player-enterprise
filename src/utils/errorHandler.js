// Error handling utilities
export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleAsyncError = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const handleAsyncController = (controllerFn) => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const errorHandler = (err, req, res) => {
  let { statusCode, message } = err;

  if (import.meta.env.MODE === 'development') {
    console.error(err);
  }

  if (import.meta.env.MODE === 'production') {
    if (err.isOperational) {
      statusCode = err.statusCode;
      message = err.message;
    } else {
      // Programming or unknown error
      statusCode = 500;
      message = 'Something went wrong!';
    }
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export const logError = (error, context = {}) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    context,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Server',
    url: typeof window !== 'undefined' ? window.location.href : 'Server',
  };

  console.error('Application Error:', errorLog);
  
  // In a real app, you might send this to an error tracking service
  // sendErrorToService(errorLog);
};

export const createError = (message, statusCode = 500) => {
  return new AppError(message, statusCode);
};

export const isOperationalError = (error) => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

export const sanitizeError = (error) => {
  // Remove sensitive information from error before logging
  const sanitizedError = { ...error };
  
  // Remove potentially sensitive fields
  delete sanitizedError.stack;
  delete sanitizedError.config;
  delete sanitizedError.request;
  
  return sanitizedError;
};

export const formatError = (error) => {
  return {
    message: error.message || 'An unknown error occurred',
    name: error.name || 'Error',
    stack: import.meta.env.MODE === 'development' ? error.stack : undefined,
    timestamp: new Date().toISOString(),
    ...(error.statusCode && { statusCode: error.statusCode }),
    ...(error.status && { status: error.status }),
  };
};

export const retryOperation = async (operation, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i))); // Exponential backoff
    }
  }
};

export const withErrorHandling = (fn, onError = null) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error, { function: fn.name, args });
      
      if (onError) {
        return onError(error);
      }
      
      throw error;
    }
  };
};

export const validateAndHandleError = (validatorFn, errorFn) => {
  return (value) => {
    try {
      return validatorFn(value);
    } catch (error) {
      logError(error, { validator: validatorFn.name, value });
      if (errorFn) {
        return errorFn(error);
      }
      throw error;
    }
  };
};

export const catchError = (promise, fallbackValue = null) => {
  return promise.catch(error => {
    logError(error);
    return fallbackValue;
  });
};

export const handleValidationError = (errors) => {
  const errorMessages = Object.values(errors).flat();
  return new AppError(`Validation failed: ${errorMessages.join(', ')}`, 400);
};

export const handleNetworkError = (error) => {
  if (error.response) {
    // Server responded with error status
    return new AppError(
      error.response.data.message || 'Server error occurred',
      error.response.status
    );
  } else if (error.request) {
    // Request was made but no response received
    return new AppError('Network error: No response from server', 503);
  } else {
    // Something else happened
    return new AppError(error.message || 'An unexpected error occurred', 500);
  }
};

export const handleAxiosError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return new AppError(data.message || `Request failed with status ${status}`, status);
  } else if (error.request) {
    // Request was made but no response received
    return new AppError('Network error: Unable to reach server', 503);
  } else {
    // Something else happened
    return new AppError(error.message || 'An unexpected error occurred', 500);
  }
};

export const handleDatabaseError = (error) => {
  // Handle specific database errors
  if (error.code === 'SQLITE_CONSTRAINT') {
    return new AppError('Data constraint violation', 400);
  } else if (error.code === 'SQLITE_BUSY') {
    return new AppError('Database is busy, please try again', 503);
  }
  
  return new AppError('Database error occurred', 500);
};

export const handleFileError = (error) => {
  if (error.name === 'FileSizeError') {
    return new AppError('File size exceeds limit', 400);
  } else if (error.name === 'FileTypeError') {
    return new AppError('Invalid file type', 400);
  }
  
  return new AppError('File processing error occurred', 500);
};

export const handleAuthError = (error) => {
  if (error.name === 'TokenExpiredError') {
    return new AppError('Authentication token has expired', 401);
  } else if (error.name === 'JsonWebTokenError') {
    return new AppError('Invalid authentication token', 401);
  }
  
  return new AppError('Authentication error occurred', 401);
};

export default {
  AppError,
  handleAsyncError,
  handleAsyncController,
  errorHandler,
  logError,
  createError,
  isOperationalError,
  sanitizeError,
  formatError,
  retryOperation,
  withErrorHandling,
  validateAndHandleError,
  catchError,
  handleValidationError,
  handleNetworkError,
  handleAxiosError,
  handleDatabaseError,
  handleFileError,
  handleAuthError,
};