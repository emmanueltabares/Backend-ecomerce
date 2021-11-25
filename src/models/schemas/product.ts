import mongoose, { Schema } from 'mongoose';
import { ProductI } from '../../interfaces/products';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const productSchema = new Schema<ProductI>({
    name: { type: String, required: true},
    cod: { type: Number, required: true},
    description: { type: String, required: true},
    photo: { type: String, required: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true},   
});

export const ProductModel = mongoose.model<ProductI>('products', productSchema);

//GraphQl
export const ProductTC = composeWithMongoose(ProductModel);