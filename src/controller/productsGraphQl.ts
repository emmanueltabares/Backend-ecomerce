import { checkProductExists } from '../middlewares/products';
import { ProductTC } from '../models/schemas/product';

export const ProductQuery = {
    productById: ProductTC.getResolver('findById'),
    productMany: ProductTC.getResolver('findMany'),
}
export const ProductMutation = {
    productCreateOne: ProductTC.getResolver('createOne'),
}