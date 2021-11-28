import { Router } from 'express'
import { productsController } from '../controller/products';
import { validateAddProduct, validateUpdateProduct } from '../middlewares/validations';
import { checkProductExists } from '../middlewares/products';

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductData:
 *       type: object
 *       properties:
 *         _id:
 *           type: String
 *           description: ID del producto
 *           example: 1
 *         name:
 *           type: String
 *           description: nombre del producto
 *           example: Monitor Samsung 24'
 *         cod: 
 *           type: number
 *           description: Codigo del producto
 *           example: 056 
 *         description:
 *           type: String
 *           description: Descripcion del producto
 *           example: Monitor samsung 4k
 *         photo:
 *           type: String
 *           description: URL a la foto del producto
 *           example: 'http://exampleURL.com'
 *         price:
 *           type: number
 *           description: precio del producto
 *           example: 2000
 *         stock:
 *           type: number
 *           description: Stock disponible del producto
 *           example: 15
 *     NewProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: String
 *           description: nombre del producto
 *           example: Teclado Logitech Gamer retroiluminado
 *         cod: 
 *           type: number
 *           description: Codigo del producto
 *           example: 040 
 *         description:
 *           type: String
 *           description: Descripcion del producto
 *           example: Teclado mecanico Gamer
 *         photo:
 *           type: String
 *           description: URL a la foto del producto
 *           example: 'http://exampleURL.com'
 *         price:
 *           type: number
 *           description: precio del producto
 *           example: 5000
 *         stock:
 *           type: number
 *           description: Stock disponible del producto
 *           example: 10
 */

const router = Router()

/**
 * @swagger
 * /:
 *   get:
 *     summary: Devuelve todos los productos con opcion de pasar un ID para que devuelva un producto especifico
 *     responses:
 *       200:
 *         description: get array of products data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items :
 *                  $ref: '#/components/schemas/ProductData'
 *       404:
 *         description: No Product exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: objeto no encontrado
 */
router.get('/:id?', checkProductExists, productsController.getProducts);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProductInput'
 *     responses:
 *       200:
 *         description: retrieve new product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: producto agregado con exito
 *                 data:
 *                    $ref: '#/components/schemas/ProductData'
 *       400:
 *         description: No Product exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: Campos del body invalidos
 *
 */
router.post('/', validateAddProduct, productsController.addProducts);

/**
 * @swagger
 * /:id:
 *   put:
 *     summary: Actualiza un producto existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProductInput'
 *     responses:
 *       200:
 *         description: retrieve updated product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: String
 *                   example: producto agregado con exito
 *                 data:
 *                    $ref: '#/components/schemas/ProductData'
 *       400:
 *         description: Invalid Body Parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: Campos del body invalidos
 *       404:
 *         description: No Product exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: objeto no encontrado
 */
router.put('/id', validateUpdateProduct, checkProductExists, productsController.updateProducts);

/**
 * @swagger
 * /:id:
 *   delete:
 *     summary: Borra un producto existente
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: producto borrado
 *       404:
 *         description: No Product exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: String
 *                   example: objeto no encontrado
 *
 */
router.delete('/id', checkProductExists, productsController.deleteProducts);

export default router;
