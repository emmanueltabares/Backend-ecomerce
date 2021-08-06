import express from 'express';
import Producto from "../Producto";

const products = new Producto();
const getProducts = products.getProducts();

const router = express.Router();

router.get('/listar', (req, res) => {
    if (getProducts.length !== 0) 
      res.json({ productos: getProducts })
    else
      res.status(400).json({ error: "No hay productos cargados" })
})

router.get('/listar/:id', (req, res) => {
    const id = req.params.id;
    const product = getProducts.find((product) => product.id == id)
    
    if (product) 
      res.json({ product })
    else
      res.status(400).json({ error: "No se encontro el producto"})
})

router.post('/guardar', (req, res) => {
    const body = req.body;
    const newProduct = products.addProduct(body.title, body.price, body.thumbnail);

    res.json({ product: newProduct, status: "se agregó correctamente"})
})

router.put('/actualizar/:id', (req, res) => {
    
})

router.delete('/borrar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try{
      const productId = products.deleteProduct(id)
      res.json({ id , status: "Se elimino correctamente" })
    } catch {
      res.status(400).json({ error: "El producto es inexistente", producto: id })
    }
})

export default router;
