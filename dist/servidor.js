"use strict";

var _Producto = _interopRequireDefault(require("./Producto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require("express");

const products = new _Producto.default();
const port = 3000;
const app = express();
const server = app.listen(port, () => {
  console.log("Servidor iniciado en puerto ", port);
});
server.on("error", error => console.log("Ocurrió un problema en el servidor ", error));
app.get("/api/productos/listar", (request, response) => {
  products.getProducts();
});
app.get("api/productos/listar/:id", (request, response) => {
  const id = request.params.id;
});