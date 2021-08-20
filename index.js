import express from "express";
import router from "./routes/recursos";
import path from "path";
import * as http from "http";
import io from "socket.io";
import Producto from "./Producto";

//OBTENIENDO DATOS DE PRODUCTOS
const products = new Producto();
const getProducts = products.getProducts();

//INICIALIZANDO EXPRESS
const port = 8080;
const app = express();

//ESTABLECIENDO CARPETA PUBLIC
const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

//CONFIGURANDO MOTOR DE PLANTILLAS
app.set('view engine', 'pug');
const viewsFolderPath = path.resolve(__dirname, './views');
app.set('views', viewsFolderPath)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", router);

//INICIANDO SERVER SOCKET.IO
const myServer = http.Server(app)
myServer.listen(port, () => console.log("Servidor iniciado en puerto", port))
const myWSServer = io(myServer);

const arrayProducts = [];
const messages = [];

myWSServer.on('connection', (socket) => {
  console.log("Se ha conectado un cliente");
  console.log(socket.client.id)

  socket.on('new-product', (data) => {
    console.log(data);
    arrayProducts.push(data)
    console.log(arrayProducts)
    myWSServer.emit('products', arrayProducts)
  });

 /*  socket.on('getProducts', (data) => {
    console.log('ME LLEGO DATA');
    console.log(data)
    arrayProducts.push(data)
    console.log(arrayProducts)
    myWSServer.emit('products', { arrayProducts });
  });  */

  socket.on('new-message', function (data) {
    const newMessage = {
      socketId: socket.client.id,
      message: data,
    };
    console.log(newMessage);
    messages.push(newMessage);
    myWSServer.emit('messages', messages);
  });

  socket.on('askData', (data) => {
    socket.emit('messages', messages);
  });
});

