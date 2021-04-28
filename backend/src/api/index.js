import { Router } from 'express';
import auth from './auth';
import posts from './posts';

const api = Router();

// /api/posts/
api.use('/posts', posts);
// /api/auth/
api.use('/auth', auth);

export default api;
