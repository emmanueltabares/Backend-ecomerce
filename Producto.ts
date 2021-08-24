export default class Producto {
    
    _products: any[]

    constructor() {
        this._products = []
    }

    addProduct = (title: String, price: number, thumbnail: String) => {
        const product = {
            title: title,
            price: price,
            thumbnail: thumbnail,
            id: this._products.length + 1
        }

        this._products.push(product)
    }

    getProducts = () => {
        return this._products;   
    }

    deleteProduct = (id: number) => {
        
        const deleteProduct = this._products.find((product) => product.id == id);
        this._products = this._products.filter((product) => product.id !== id);

        return this._products;
    }

    putProduct = (id: number) => {
        
    }
}