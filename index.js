import express from "express";
import router from "./routes/recursos";
import path from "path";
import handlebars from "express-handlebars";

const port = 3000;
const app = express();

const server = app.listen(port, () => {
  console.log("Servidor iniciado en puerto ", port);
});

server.on("error", (error) =>
  console.log("Ocurrió un problema en el servidor ", error)
);

/* const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath)); */

const layoutFolderPath = path.resolve(__dirname, './views/layouts');
const defaultLayerPath = path.resolve(__dirname, './views/layouts/index.handlebars')
const partialFolderPath = path.resolve(__dirname, './views/partial')

app.set('view engine', 'handlebars');
app.engine('handlebars', 
  handlebars({
    layoutsDir: layoutFolderPath,
    defaultLayout: defaultLayerPath,
    partialsDir: partialFolderPath
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", router);
