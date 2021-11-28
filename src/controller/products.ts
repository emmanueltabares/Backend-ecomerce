import { productsAPI } from '../apis/products';
import { Request, Response, NextFunction } from 'express';

class Products {
  
    async getProducts(req: Request, res: Response) {
      const { id } = req.params;
  
      const product = id
        ? await productsAPI.get(id)
        : await productsAPI.get();
  
      res.json({
        data: product,
      });
    }
  
    async addProducts(req: Request, res: Response) {
      const newItem = await productsAPI.add(req.body);
  
      res.json({
        msg: 'producto agregado con exito',
        data: newItem,
      });
    }
  
    async updateProducts(req: Request, res: Response) {
      const { id } = req.params;
      const { body } = req.body;

      const newProduct = await productsAPI.update(id, body)

      res.json({
        msg: 'actualizando producto',
        data: newProduct
      });
    }
  
    async deleteProducts(req: Request, res: Response) {
      const { id } = req.params;
  
      const product = await productsAPI.delete(id);
      res.json({
        msg: 'producto borrado',
        data: product
      });
    }
  }
  
  export const productsController = new Products();