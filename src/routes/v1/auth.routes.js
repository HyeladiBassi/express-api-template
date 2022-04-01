import { Router } from 'express';
import { login } from '../../controllers/auth/auth.controller';
import validate from '../../middlewares/validate';
import { auth } from '../../validation/auth.validation';

export default () => {
  const authRoutes = Router();
  authRoutes.post('/login', validate(auth.login), login);
  return authRoutes;
};
