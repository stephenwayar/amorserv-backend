import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
const app = express();
import cors from 'cors';
import morgan from 'morgan';

import './database/config';
import './models/User';

import indexRoute from './routes/index';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import { unknownEndpoint, errorHandler } from './middlewares/error';
import { tokenExtractor } from './middlewares/tokenExtractor';
import { userExtractor } from './middlewares/userExtractor';

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use((req: Request, res: Response, next: NextFunction) => {
  tokenExtractor(req as any, res, next);
});

app.use(indexRoute);
app.use(authRoute);
app.use(userExtractor, userRoute);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;