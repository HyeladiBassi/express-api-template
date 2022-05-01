import express from 'express';
import testRoutes from './test/test.routes';

const router = express();

router.use('/test', testRoutes());

export default router;
