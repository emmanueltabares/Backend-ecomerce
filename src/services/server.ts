import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';

const app = express();

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.get('/chat', (req, res) => {
    res.render('index')
})

app.use(express.json());
app.use('/api', apiRouter);

app.set('view engine', 'pug');
const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('views', viewsFolderPath)

const myServer = new http.Server(app);

export default myServer;