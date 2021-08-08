import express from "express";
import router from "./routes/recursos";
import path from "path";

const port = 3000;
const app = express();

const server = app.listen(port, () => {
  console.log("Servidor iniciado en puerto ", port);
});

server.on("error", (error) =>
  console.log("Ocurrió un problema en el servidor ", error)
);

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.set('view engine', 'pug');
const viewsFolderPath = path.resolve(__dirname, './views');
app.set('views', viewsFolderPath)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", router);
