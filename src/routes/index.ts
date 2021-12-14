import Router from 'koa-router';
import ProductosRouter from './productos';

const router = new Router({
  prefix: '/api',
});

router.use(ProductosRouter);

export default router.routes();