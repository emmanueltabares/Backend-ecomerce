import { Router } from "express";
import { loginUser, logoutUser, singUpUser } from "../controllers/login";
import passport from '../middleware/auth';

const router = Router();

router.get('/', (req, res) => {
    res.render('login')
})
router.post('/login', passport.authenticate('login'), loginUser);
router.get('/logout', logoutUser);
router.post('/signup', passport.authenticate('signup'), singUpUser);

export default router;
