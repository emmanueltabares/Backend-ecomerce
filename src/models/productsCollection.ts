  
import Mongoose from "mongoose";

const productCollection = "products";

const productSchema = new Mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  createat: { type: Date }
});

export const products = Mongoose.model(productCollection, productSchema);