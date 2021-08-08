export default class Producto {

    constructor() {
        this._products = [];
    }

    addProduct = (title, price, thumbnail) => {
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

    deleteProduct = (id) => {
        
        const deleteProduct = this._products.find((product) => product.id == parseInt(id));
        this._products = this._products.filter((product) => product.id !== parseInt(id)); 

        return this._products;
    }

    putProduct = (id) => {
        
    }
}