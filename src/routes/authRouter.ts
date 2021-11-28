import { Router } from 'express';
import passport from '../middlewares/auth';
import { validateUser } from '../middlewares/validations';

const router = Router();

router.post('/login', passport.authenticate('login'), function (req, res) {
  res.redirect('../views/index.pug')
});

router.post('/signup', validateUser, (req, res, next) => {
  passport.authenticate('signup', function (err, data, info) {
    if (err) {
      return next(err);
    }

    if (data.error) return res.status(401).json({ msg: data.error });

    // if (!user) return res.status(401).json({ msg:"Una" });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
});

export default router;