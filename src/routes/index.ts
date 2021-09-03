import { Router } from 'express';
import productosRouter from './productosRouter';

const router = Router();

router.use('/products', productosRouter)

export default router;