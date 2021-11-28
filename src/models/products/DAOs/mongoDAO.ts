import { ProductI, newProductI, BaseProductI } from "../../../interfaces/products";
import { ProductModel } from "../../schemas/product";

export class ProductsMongoDAO implements BaseProductI {
    
    async find(id: string) {  
        let product;
        try {
            product = await ProductModel.findOne({ _id: id });
            return product;
        } catch (error) {
            return error;
        }
    }
    async get(id?: string): Promise<ProductI[]> {
    

        let products: ProductI[] = [];
        
        try {
            if(id) {
                const product = await ProductModel.findById(id);
                if (product) products.push(product);
            } else {
                products = await ProductModel.find();
            }
            return products;
        } catch (error) {
            return products;
        } 
    }


    async add(data: newProductI): Promise<ProductI> {

        const newProduct = new ProductModel(data);
        await newProduct.save();

        return newProduct;
       
    }
    async delete(id: string): Promise<void> {
        await ProductModel.findByIdAndDelete(id);  
   }
    async update(id: string, newProductData: newProductI): Promise<void> {
        await ProductModel.findByIdAndUpdate(id, newProductData);
    }
}
