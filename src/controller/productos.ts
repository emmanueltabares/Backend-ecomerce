import { productsPersistance } from '../persistance/productos';
import { Context, Next } from 'koa';

class Products {
  
    async getProducts(ctx: Context, next: Next) {
      const { id } = ctx;
  
      const product = id
        ? await productsPersistance.get(id)
        : await productsPersistance.get();
  
        ctx.body = {
          status: 'success',
          message: product,
        };
        next();
    }
    
    async addProducts(ctx: Context, next: Next) {
      const data = ctx.request.body;
      const newItem = await productsPersistance.add(data);
      ctx.body = {
        status: 'success',
        message: `New product: ${newItem}`,
      };
      next();
  }

    async updateProducts(ctx: Context, next: Next) {
      const { id } = ctx.params.id;
      const { body } = ctx.request.body;

      const newProduct = await productsPersistance.update(id, body)

      ctx.body = {
        status: 'success',
        message: `Update product: ${newProduct}`,
      };
      next();
    }
  
    async deleteProducts(ctx: Context, next: Next) {
      const { id } = ctx.params.id;
  
      const product = await productsPersistance.delete(id);
      ctx.body = {
        status: 'success',
        message: `product deleted: ${product}`,
      };
      next();
    }
  }
  
  export const productsController = new Products();