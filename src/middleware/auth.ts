import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportLocal, { IStrategyOptionsWithRequest } from 'passport-local';
import { UserModel } from '../models/userSchema';
import { User, UserI } from '../models/interfaces/userI';

const LocalStrategy = passportLocal.Strategy;

const strategyOptions: IStrategyOptionsWithRequest  = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
};

const loginFunc = async (_req: Request, username: string, password: string, done: any) => {
  const user = await UserModel.findOne({ username });

  if (!user) {
    return done(null, false, { message: 'User does not exist' });
  }
  if (!user.isValidPassword(password)) {
    return done(null, false, { message: 'Password is not valid.' });
  }
  console.log('SALIO TODO BIEN');
  return done(null, user);
};

const signUpFunc = async (req: Request, username: string, password: string, done: any) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
      console.log('Invalid body fields');
      return done(null, false);
    }

    const query = {
      $or: [{ username: username }],
    };

    console.log(query);
    const user = await UserModel.findOne(query);

    if (user) {
      console.log('User already exists');
      console.log(user);
      return done(null, false, 'User already exists');
    } else {
      const userData = {
        username,
        password,
      };

      const newUser = new UserModel(userData);

      await newUser.save();

      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

passport.use('login', new LocalStrategy(strategyOptions, loginFunc));
passport.use('signup', new LocalStrategy(strategyOptions, signUpFunc));

passport.serializeUser((user: User, done) => {
  // console.log(user);
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.findById(userId, function (err: Error, user: UserI) {
    done(err, user);
  });
});

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ msg: 'Unathorized' });

  next();
};

export default passport;