import { Schema } from 'mongoose';
import { ProductDTO } from './products.dto';

export const ProductSchema = new Schema<ProductDTO>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  price: { type: Number, required: true }
});
