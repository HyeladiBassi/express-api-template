import { ExtractJwt } from 'passport-jwt';
import JwtStrategy from 'passport-jwt/lib/strategy';
import config from './config';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const userId = payload.sub;
    // get user by id if exists continue else return done(null, false)
    // Below is mock user
    const user = {
      userId: userId,
      role: 'user',
    };
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
