"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Producto_1 = __importDefault(require("../Producto"));
const products = new Producto_1.default();
const getProducts = products.getProducts();
const router = express_1.Router();
router.get('/', (req, res) => {
    if (getProducts)
        res.render('index', { getProducts });
});
router.get('/listar', (req, res) => {
    if (getProducts.length !== 0)
        res.json(getProducts);
    else
        res.status(400).json({ error: "No hay productos cargados" });
});
/* router.get('/vista', (req: Request, res: Response) => {
    if(getProducts)
        res.render('index.pug', { getProducts })
}) */
router.get('/listar/:id', (req, res) => {
    const id = req.params.id;
    const product = getProducts.find((product) => product.id == id);
    if (product)
        res.json({ product });
    else
        res.status(400).json({ error: "No se encontro el producto" });
});
router.post('/guardar', (req, res) => {
    const body = req.body;
    const newProduct = products.addProduct(body.title, body.price, body.thumbnail);
    res.render('index.pug', { getProducts });
});
router.put('/actualizar/:id', (req, res) => {
});
router.delete('/borrar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const productId = products.deleteProduct(id);
        res.json({ productId, status: "Se elimino correctamente" });
    }
    catch (_a) {
        res.status(400).json({ error: "El producto es inexistente", producto: id });
    }
});
exports.default = router;
