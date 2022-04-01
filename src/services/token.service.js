import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (userId, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: dayjs().add(config.jwt.accessExpirationMinutes, 'm').unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment|Dayjs} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {boolean}
 */
export const saveToken = async (token, userId, type, blacklisted = false) => {
  // For extra security you can hash token before saving
  const tokenObject = {
    token,
    user: userId,
    expires: dayjs().add(config.jwt.accessExpirationMinutes, 'm').unix(),
    type,
    blacklisted,
  };
  // Insert token into database
  // Return boolean on successful insert
  return !!tokenObject;
};

/**
 * Verify token and return token (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
export const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  console.log('verifyToken => payload', payload);
  const tokenDoc = !!payload; // Find token inside database
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};
