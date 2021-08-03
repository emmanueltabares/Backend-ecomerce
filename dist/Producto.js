"use strict";

class Producto {
  constructor() {
    this._products = [];
  }

  addProduct = (title, price, thumbnail) => {
    const product = {
      title: title,
      price: price,
      thumbnail: thumbnail,
      id: this._products.length + 1
    };

    this._products.push(product);
  };
  getProduct = id => {};
  getProducts = () => {
    if (this._products !== 0) {
      return this._products;
    } else {
      return "No hay productos cargados";
    }
  };
}