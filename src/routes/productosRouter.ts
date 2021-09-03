import { Router } from "express";
import { productoController } from "../controller/Producto";

const router = Router();

router.get('/', productoController.getAllProducts)

router.get('/:id', productoController.getProductsById)

router.post('/', productoController.addProducts)

router.put('/:id', productoController.updateProducts)

router.delete('/:id', productoController.deleteProducts)

export default router;