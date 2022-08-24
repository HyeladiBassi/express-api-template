import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: process.env.NODE_ENV === 'development' ? `./.env.${process.env.NODE_ENV}` : `.env` });

const envsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'staging', 'development').default('development').required(),
    PORT: Joi.number().default(9999),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    SMTP_API_KEY: Joi.string().description('api key for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    FB_DEFAULT_URL: Joi.string().description('firebase default url').required(),
    ALLOWED_URL: Joi.string().description('allowed app url').required(),
  })
  .unknown();

const { value: envs, error } = envsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envs.NODE_ENV,
  port: envs.PORT,
  jwt: {
    secret: envs.JWT_SECRET || 'mysecret',
    accessExpirationMinutes: envs.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envs.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envs.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envs.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  smtp: {
    host: envs.SMTP_HOST,
    port: envs.SMTP_PORT,
    username: envs.SMTP_USERNAME,
    password: envs.SMTP_PASSWORD,
    apiKey: envs.SMTP_API_KEY,
    from: envs.EMAIL_FROM,
  },
  fb: {
    defaultUrl: envs.FB_DEFAULT_URL,
  },
  allowedUrl: envs.ALLOWED_URL,
};
