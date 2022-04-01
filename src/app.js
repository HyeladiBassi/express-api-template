import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import passport from 'passport';
import xss from 'xss-clean';
import config from './config/config';
import { morganErrorHandler, morganSuccessHandler } from './config/morgan';
import { jwtStrategy } from './config/passport';
import { errorConverter, errorHandler } from './middlewares/error';
import { authLimiter, rateLimiter } from './middlewares/rateLimiter';
import router from './routes';
import ApiError from './utils/ApiError';

const app = express();

// Set Global Error Handler
if (config.env !== 'development') {
  app.use(morganSuccessHandler);
  app.use(morganErrorHandler);
}

// Set security HTTP headers
app.use(helmet());

// Parse Json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xss());

// Set gzip compression
app.use(compression());

// Enable cors
app.use(cors());
app.options('*', cors());

// JWT authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Set Rate limit for specific endpoints
app.use(rateLimiter);
app.use('/v1/auth', authLimiter);

// Set Routes
app.use(router);

// Send back 404 error for any unknown api requests
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert all errors to ApiError
app.use(errorConverter);

// Use error handler
app.use(errorHandler);

export default app;
