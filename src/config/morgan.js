import morgan from 'morgan';
import config from './config';
import Logger from './logger';

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const morganSuccessHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => Logger.http(message.trim()) },
});

export const morganErrorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => Logger.http(message.trim()) },
});
