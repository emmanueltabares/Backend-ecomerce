import { Router } from "express";
import { loginUser, logoutUser, singUpUser } from "../controllers/login";
import passport from '../middleware/auth';
import { User } from "../models/interfaces/userI";

const router = Router();

router.get('/', (req, res) => {
    res.render('login')
})
/* router.post('/login', passport.authenticate('login'), loginUser); */

router.get('/logout', logoutUser);
/* router.post('/signup', passport.authenticate('signup'), singUpUser); */

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/api/messages', 
        failureRedirect: '/api/logout',
    })
);

router.get('/index', (req, res) => {
  let foto = 'noPhoto';
  let email = 'noEmail';

  if (req.isAuthenticated()) {
    const userData: User = req.user;

    if (userData.photos) foto = userData.photos[0].value;

    if (userData.emails) email = userData.emails[0].value;

    res.render('messages', {
      nombre: userData.displayName,
      contador: userData.contador,
      foto,
      email,
    });
  } else {
    res.redirect('/api/login');
  }
});

export default router;
