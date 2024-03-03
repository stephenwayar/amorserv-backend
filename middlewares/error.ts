import { Request, Response, NextFunction } from 'express';

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'Malformatted ID: ID is incorrect or altered'
    });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Invalid token'
    });
  } else if (error.name === 'UnhandledPromiseRejectionWarning') {
    return response.status(500).json({
      error: 'Server error'
    });
  }

  next(error);
};

export { unknownEndpoint, errorHandler };