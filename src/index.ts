import app from './services/server';

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Servidor Koa escuchando en el puerto ${PORT}`);
});

server.on('error', (error) => console.log('Error en Servidor Koa:', error));