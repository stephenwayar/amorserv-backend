import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { info } from '../utils/logger';
import { RequestType } from './tokenExtractor';
import { SECRET } from '../utils/config';

const userExtractor = (request: RequestType, response: Response, next: NextFunction) => {
  if (!request.token) {
    info('token is missing');
    return next();
  }

  if (!SECRET) {
    throw new Error('SECRET environment variable is not defined');
  }

  const decodedToken = jwt.verify(request.token, SECRET) as { [key: string]: any } | null;

  if (decodedToken === null) {
    info('token present but invalid'); // dev mode
    return response.status(401).json({
      error: 'token missing or invalid'
    });
  }

  request.user = decodedToken;

  next();
};

export { userExtractor };
