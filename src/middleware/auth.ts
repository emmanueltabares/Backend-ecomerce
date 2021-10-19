import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { StrategyOption, VerifyFunction, Strategy as FacebookStrategy } from 'passport-facebook';
import config from '../config'

const strategyOptions: StrategyOption  = {
  clientID: config.FACEBOOK_APP_ID,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails']
};

const loginFunc: VerifyFunction = async (accessToken, refreshToken, profile, done) => {
  console.log('SALIO TODO OK');
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  return done(null, profile);
};

passport.use(new FacebookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: string, cb) {
  cb(null, obj);
});

export const isLoggedIn = (req: Request, res: Response, done: NextFunction) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;