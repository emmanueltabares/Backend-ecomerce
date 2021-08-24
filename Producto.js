"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Producto {
    constructor() {
        this.addProduct = (title, price, thumbnail) => {
            const product = {
                title: title,
                price: price,
                thumbnail: thumbnail,
                id: this._products.length + 1
            };
            this._products.push(product);
        };
        this.getProducts = () => {
            return this._products;
        };
        this.deleteProduct = (id) => {
            const deleteProduct = this._products.find((product) => product.id == id);
            this._products = this._products.filter((product) => product.id !== id);
            return this._products;
        };
        this.putProduct = (id) => {
        };
        this._products = [];
    }
}
exports.default = Producto;
