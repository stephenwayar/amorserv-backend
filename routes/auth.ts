import express from 'express';
import { login_user, register_user } from '../controllers/AuthController';

const Router = express.Router();

Router.post('/api/auth/login', login_user);

Router.post('/api/auth/register', register_user);

export default Router;