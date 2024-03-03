import { Request, Response, NextFunction } from 'express';

export interface RequestType extends Request { 
  token: string; 
  user: any 
}

const tokenExtractor = (request: RequestType, _response: Response, next: NextFunction) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

export { tokenExtractor };