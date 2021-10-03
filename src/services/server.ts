import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import session from 'express-session';

const app = express();

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(express.urlencoded({ extended: true}))

app.use('/index', (req, res) => {
    res.render('index.pug')
})

app.use(express.json());

app.use(
    session({
      secret: 'fhrgfgrfrty84fwir767',
      cookie: { maxAge: 10000 * 60 },
      saveUninitialized: true,
      resave: true,
    })
  );
app.use('/api', apiRouter);

app.set('view engine', 'pug');
const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('views', viewsFolderPath)

const myServer = new http.Server(app);

export default myServer;