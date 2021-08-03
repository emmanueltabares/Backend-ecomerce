import { response } from "express";

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
}