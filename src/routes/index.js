import express from 'express';
import testRoutes from './test/test.routes';
import authRoutes from './v1/auth.routes';

const router = express();

router.use('/test', testRoutes());

// Version 1 Routes
router.use('/v1/auth', authRoutes());

export default router;
