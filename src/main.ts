import dotenv from 'dotenv';
import morgan from 'morgan';

import App from './core/app';
import { getNumberFromString } from './helpers/convert';
import ControllerBase from './core/controllerbase';
import DataClientBase from './core/dataclientbase';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

dotenv.config();

const logFormat = process.env.LOG_FORMAT ? process.env.LOG_FORMAT : 'dev';

var controllers: ControllerBase[] = [];
var middlewares = [
    morgan('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({extended: false}),
    cookieParser(),
    expressSession({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
];

var dataClient: DataClientBase = undefined;

const app = new App({
    httpPort: getNumberFromString(process.env.HTTP_PORT, 8000),
    httpsPort: process.env.HTTPS_PORT ? getNumberFromString(process.env.HTTPS_PORT, 8443) : undefined,
    certFilePath: process.env.CERT_FILE_PATH ? process.env.CERT_FILE_PATH : undefined,
    keyFilePath: process.env.KEY_FILE_PATH ? process.env.KEY_FILE_PATH : undefined,
    viewEngine: 'ejs',
    viewsFolder: '../views',
    publicFolder: '../public',
    controllers: controllers,
    middlewares: middlewares,
    dataClient: dataClient
});

app.start();
