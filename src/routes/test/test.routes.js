import { Router } from 'express';
import validate from '../../middlewares/validate';
import {
  produce200,
  produce400,
  produce401,
  produce403,
  produce404,
  produce500,
  produceAuthLogin,
  produceAuthRegister,
} from '../../controllers/test/test.controller';
import { auth } from '../../validation/auth.validation';
import { authMid } from '../../middlewares/auth';

export default () => {
  const testRoutes = Router();
  // Test Status Codes
  testRoutes.get('/200', produce200);
  testRoutes.get('/400', produce400);
  testRoutes.get('/401', produce401);
  testRoutes.get('/403', produce403);
  testRoutes.get('/404', produce404);
  testRoutes.get('/500', produce500);

  // Test JWT auth and request validation
  testRoutes.get('/protected', authMid(), produce200);
  testRoutes.get('/unauthorized', authMid('manageUsers'), produce200);
  testRoutes.post('/login', validate(auth.login), produceAuthLogin);
  testRoutes.post('/register', validate(auth.register), produceAuthRegister);
  return testRoutes;
};
