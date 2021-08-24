import { Router, Request, Response} from 'express';
import Producto from "../Producto";

const products = new Producto();
const getProducts = products.getProducts();

const router = Router();

router.get('/', (req: Request, res: Response) => {
    if(getProducts)
        res.render('index', { getProducts })
})

router.get('/listar', (req: Request, res: Response) => {
    if (getProducts.length !== 0) 
        res.json(getProducts)
        
    else
      res.status(400).json({ error: "No hay productos cargados" })
})


/* router.get('/vista', (req: Request, res: Response) => {
    if(getProducts)
        res.render('index.pug', { getProducts })
}) */

router.get('/listar/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const product = getProducts.find((product) => product.id == id)
    
    if (product) 
      res.json({ product })
    else
      res.status(400).json({ error: "No se encontro el producto"})
})

router.post('/guardar', (req: Request, res: Response) => {
    const body = req.body;
    const newProduct = products.addProduct(body.title, body.price, body.thumbnail);
    res.render('index.pug', { getProducts })
})

router.put('/actualizar/:id', (req: Request, res: Response) => {
    
})

router.delete('/borrar/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try{
      const productId = products.deleteProduct(id)
      res.json({ productId , status: "Se elimino correctamente" })
    } catch {
      res.status(400).json({ error: "El producto es inexistente", producto: id })
    }
})


export default router;
