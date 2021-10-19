import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from '../middleware/auth';
import 'dotenv/config'
import { fork } from 'child_process';

const app = express();
const timeSession = 1000 * 60 * 60;

const scriptPath = path.resolve(__dirname, '../utils/calculo.ts');

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))

app.use('/index', (req, res) => {
    res.render('index.pug')
})

app.use(express.json());

app.use(
    session({
      secret: 'fhrgfgrfrty84fwir767',
      cookie: { maxAge: timeSession },
      saveUninitialized: false,
      resave: true,

      store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`,
      }) 
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

app.get('/randoms', (req, res) => {
  const computo = fork(scriptPath);
  computo.send('start');
  computo.on('message', (sum) => {
    res.json({
      resultado: sum,
    });
  });
});

app.get('/info', (req, res) => {
  
})

app.set('view engine', 'pug');
const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('views', viewsFolderPath)

const myServer = new http.Server(app);

export default myServer;