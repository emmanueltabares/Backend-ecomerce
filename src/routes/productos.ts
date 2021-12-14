import Router from 'koa-router';
import { productsController } from '../controller/productos'

const router = new Router({
  prefix: '/productos',
});

router.get('/:id?', productsController.getProducts)
router.post('/', productsController.addProducts)
router.put('/:id', productsController.updateProducts);
router.delete('/:id', productsController.deleteProducts);

export default router.routes();