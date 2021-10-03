import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/login";

const router = Router();

router.get('/', (req, res) => {
    res.render('login')
})
router.post('/login', loginUser)
router.get('/logout', logoutUser)

export default router;
