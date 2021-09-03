import { Request, Response, NextFunction } from 'express';
import { DBService } from '../services/db';


const tableName = 'productos';

class Producto {
  /* checkAddProducts(req: Request, res: Response, next: NextFunction) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    if (!nombre || !precio || !descripcion || !codigo || !foto || !stock || typeof nombre !== 'string' || isNaN(precio)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  checkProductExists(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const producto = productsPersistencia.find(id);

    if (!producto) {
      return res.status(404).json({
        msg: 'producto not found',
      });
    }
    next();
  } */

  async getAllProducts(req: Request, res: Response) {
    
    const items = await DBService.getAll(tableName)

    res.json({
      data: items,
    });
  }

  async getProductsById(req: Request, res: Response) {
    const { id } = req.params;

    const item = await DBService.get(tableName, Number(id))
  
    if(!item.length) 
      return res.status(404).json({
        msg: "Product not found"
      })
  
    res.json({
      data: item,
    });
  }

  async addProducts(req: Request, res: Response) {

    const data = req.body;

    if(!data)
      return res.status(404).json({
        msg: "Campos invalidos",
      });

    const id = await DBService.create(tableName, data);
    const newProduct = await DBService.get(tableName, id)

    res.json({
      msg: 'producto agregado con exito',
      data: newProduct,
    });
  }

  async updateProducts(req: Request, res: Response) {
    
    const { id } = req.params;
    const body = req.body;

    if(!body)
      return res.status(404).json({
        msg: "Campos invalidos",
      });

    let item = await DBService.get(tableName, Number(id))

    if(!item.length) 
      return res.status(404).json({
        msg: "Product not found"
      });

    await DBService.update(tableName, id, body);

    item = await DBService.get(tableName, Number(id))
    res.json({
      msg: 'Producto actualizado',
      item,
    });
  }

  async deleteProducts(req: Request, res: Response) {

    const { id } = req.params;

    let item = await DBService.get(tableName, Number(id))

    if(!item.length) 
      return res.status(404).json({
        msg: "Product not found"
      });

    await DBService.delete(tableName, id)
    res.json({
      msg: 'product deleted',
    });
  }
}

export const productoController = new Producto();