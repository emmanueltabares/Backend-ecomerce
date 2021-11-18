import { Router } from 'express'
import productsRouter from './productsRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';
import { isLoggedIn } from '../middlewares/auth';

const router = Router()

router.use('/products', isLoggedIn, productsRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter)

export default router;