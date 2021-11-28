import { newProductI, ProductI } from '../interfaces/products';
import { NoticiasFactoryDAO } from '../models/products/products.factory';
import { TipoPersistencia } from '../models/products/products.factory';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.MongoAtlas;

class prodAPI {
  private productos: any;

  constructor() {
    this.productos = NoticiasFactoryDAO.get(tipo);
  }

  async get(id: string | undefined = undefined): Promise<ProductI[]> {
    if (id) return this.productos.get(id);

    return this.productos.get();
  }

  async add(productData: newProductI): Promise<ProductI> {
    const newProduct = await this.productos.add(productData);
    return newProduct;
  }

  async update(id: string, productData: newProductI) {
    const updatedProduct = await this.productos.update(id, productData);
    return updatedProduct;
  }

  async delete(id: string) {
    await this.productos.delete(id);
  }
}

export const productsAPI = new prodAPI();