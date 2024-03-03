import express from 'express';
import { get_user_profile } from '../controllers/UserController';

const Router = express.Router();

Router.post('/api/user/:id', get_user_profile);

export default Router;