import {Router} from 'express';
import productsRouter from './producto';
import carritoRouter from './carrito';
import loginRouter from './login';
import messagesRouter from './messages';
import { validateLogIn } from '../middleware/loginUser';

const router = Router();

router.use('/products', validateLogIn, productsRouter);
router.use('/cart', validateLogIn, carritoRouter);
router.use('/messages', messagesRouter)
router.use('/', loginRouter)

export default router;