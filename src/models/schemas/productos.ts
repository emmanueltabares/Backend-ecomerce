import { Schema } from 'mongoose';
import { MongoDB } from '../../services/mongodb';
import { ProductosI } from '../productos';

const productSchema = new Schema<ProductosI>({
    name: { type: String, required: true},
    cod: { type: Number, required: true},
    description: { type: String, required: true},
    photo: { type: String, required: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true},   
});

const MongoAtlas = new MongoDB();
const AtlasMongoose = MongoAtlas.getConnection();

export const ProductModel = AtlasMongoose.model<ProductosI>('products', productSchema);