"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recursos_1 = __importDefault(require("./routes/recursos"));
const path_1 = __importDefault(require("path"));
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const Producto_1 = __importDefault(require("./Producto"));
//OBTENIENDO DATOS DE PRODUCTOS
const products = new Producto_1.default();
const getProducts = products.getProducts();
//INICIALIZANDO EXPRESS
const port = 8080;
const app = express_1.default();
//ESTABLECIENDO CARPETA PUBLIC
const publicPath = path_1.default.resolve(__dirname, "./public");
app.use(express_1.default.static(publicPath));
//CONFIGURANDO MOTOR DE PLANTILLAS
app.set('view engine', 'pug');
const viewsFolderPath = path_1.default.resolve(__dirname, './views');
app.set('views', viewsFolderPath);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/productos", recursos_1.default);
//INICIANDO SERVER SOCKET.IO
const myServer = new http.Server(app);
myServer.listen(port, () => console.log("Servidor iniciado en puerto", port));
const io = new socket_io_1.Server(myServer);
const arrayProducts = [];
const messages = [];
io.on('connection', (socket) => {
    console.log("Se ha conectado un cliente");
    console.log(socket.client.id);
    socket.on('new-product', (data) => {
        console.log(data);
        arrayProducts.push(data);
        console.log(arrayProducts);
        io.emit('products', arrayProducts);
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
        io.emit('messages', messages);
    });
    socket.on('askData', () => {
        socket.emit('messages', messages);
    });
});
