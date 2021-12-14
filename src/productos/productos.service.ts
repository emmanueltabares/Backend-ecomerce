import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDTO } from './dto/products.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel('Productos') private readonly productModel: Model<ProductDTO>,
  ) {}

  async getProducts(): Promise<ProductDTO[]> {
    return await this.productModel.find();
  }

  async createProduct(product: ProductDTO): Promise<ProductDTO> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateProduct(
    idProduct: string,
    product: ProductDTO,
  ): Promise<ProductDTO> {
    return await this.productModel.findByIdAndUpdate(idProduct, product);
  }

  async deleteProduct(idProduct: string): Promise<void> {
    await this.productModel.findByIdAndDelete(idProduct);
  }
}
