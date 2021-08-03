import express from "express";
import Producto from "./Producto";

const products = new Producto();
const getProducts = products.getProducts();

const port = 3000;
const app = express();

const server = app.listen(port, () => {
  console.log("Servidor iniciado en puerto ", port);
});

server.on("error", (error) =>
  console.log("Ocurrió un problema en el servidor ", error)
);

app.get("/api/productos/listar", (request, response) => {
    if (getProducts.length !== 0) 
      response.json({ productos: getProducts })
    else
      response.status(400).json({ error: "No hay productos cargados" })
});

app.get("/api/productos/listar/:id", (request, response) => {
    const id = request.params.id;
    const product = getProducts.find((product) => product.id == id)
    
    if (product) 
      response.json({ product })
    else
      response.status(400).json({ error: "No se encontro el producto"})
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/productos/guardar", (require, response) => {
  const body = require.body;
  const newProduct = products.addProduct(body.title, body.price, body.thumbnail);

  response.json({ product: newProduct, status: "se agregó correctamente"})
})