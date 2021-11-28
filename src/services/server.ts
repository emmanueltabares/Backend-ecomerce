import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import { Logger } from './logger';
import config from '../config/config';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { graphqlHTTP } from 'express-graphql';
import { graphQLSchema } from '../services/graphql';

const app = express();
const PUBLIC_FOLDER_PATH = path.resolve(__dirname, '../../public');

const OPTIONS = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Proyecto de Emmanuel Tabares con Swagger',
      version: '0.0.1',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Emmanuel Tabares',
        url: 'https://github.com/emmanueltabares',
        email: 'manutabares20@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8081',
        description: 'Development server',
      },
    ],
  },
  apis: ['src/routes/*'],
};

const SPECS = swaggerJsdoc(OPTIONS)
app.use('/api-docs', swaggerUi.serve , swaggerUi.setup(SPECS))

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_SRV,
      }),
    
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: config.SESSION_COOKIE_TIMEOUT_MIN * 60 * 1000,
      }
  })
) 

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(PUBLIC_FOLDER_PATH));

app.set('view engine', 'pug');
const viewsFolderPath = path.resolve(__dirname, '../views');
app.set('views', viewsFolderPath)

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', (req, res) => {
  res.render('login.pug');
}); 

app.use('/api', apiRouter);

//GraphQL
app.use('/graphql', graphqlHTTP({
  schema: graphQLSchema,
  graphiql: true,
}))
 
const errorHandler: ErrorRequestHandler = (err, req, res) => {
    Logger.error(`HUBO UN ERROR ${err.message}`);
      res.status(500).json({
      err: err.message,
    });   
  };

app.use(errorHandler);

const server = new http.Server(app);

export default server;

