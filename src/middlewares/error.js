import httpStatus from 'http-status';
import config from '../config/config';
import Logger from '../config/logger';
import ApiError from '../utils/ApiError';
import { error } from '../utils/responseApi';

/**
 * Converts all errors to instnaces of ApiError
 */
export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

/**
 * Catches all errors and returns a uniform error format
 */
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = error(null, message, statusCode);
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  } else if (config.env === 'development') {
    response.stack = err.stack;
    Logger.error(err);
  }
  res.status(statusCode).send(response);
};
