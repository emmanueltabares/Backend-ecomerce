import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

export default {

    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || '8080',
    HOST: process.env.HOST || 'localhost',

    MONGO_SRV: process.env.MONGO_SRV || 'mongosrv',

    SESSION_SECRET: process.env.SESSION_SECRET || 'miSecretKey',
    SESSION_COOKIE_TIMEOUT_MIN: Number(process.env.SESSION_COOKIE_TIMEOUT_MIN),

    ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'GMAIL owner name',
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'email@gmail.com',
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'password',

    URL_HTTP_AXIOS: process.env.URL_HTTP_AXIOS || 'localhost',
}