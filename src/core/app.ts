import e from "express";
import {Server as HttpServer, createServer as createHttpServer, RequestListener, IncomingMessage, ServerResponse} from 'http';
import {Server as HttpsServer, createServer as createHttpsServer} from 'https';
import fs from 'fs';
import {redirect} from '../helpers/http';
import path from 'path';
import ControllerBase from "./controllerbase";
import MiddlewareBase from "./middlewarebase";
import DataClientBase from "./dataclientbase";

export default class App {
    private _app: e.Application;
    private _httpPort: number;
    private _httpsPort?: number;
    private _httpServer: HttpServer;
    private _httpsServer?: HttpsServer;
    private _keyFilePath?: string;
    private _certFilePath?: string;
    private _publicFolder: string;
    private _viewsFolder: string;
    private _viewEngine: string;
    private _controllers: ControllerBase[];
    private _middlewares: MiddlewareBase[];
    private _dataClient?: DataClientBase;

    constructor(appOptions: {
        httpPort: number,
        httpsPort?: number,
        viewEngine?: string,
        controllers?: ControllerBase[],
        middlewares?: any,
        keyFilePath?: string,
        certFilePath?: string,
        publicFolder?: string,
        viewsFolder?: string,
        dataClient?: DataClientBase
    }) {
        this._httpPort = appOptions.httpPort;
        this._httpsPort = appOptions.httpsPort;
        this._keyFilePath = appOptions.keyFilePath;
        this._certFilePath = appOptions.certFilePath;
        this._publicFolder = appOptions.publicFolder ? appOptions.publicFolder : 'public';
        this._viewsFolder = appOptions.viewsFolder ? appOptions.viewsFolder : 'views';
        this._viewEngine = appOptions.viewEngine ? appOptions.viewEngine : 'ejs';
        this._controllers = appOptions.controllers;
        this._middlewares = appOptions.middlewares;
        this._dataClient = appOptions.dataClient;

        this._app = e();

        this.intitializeViews();
        this.intitializeViews();
        this.initializeStatic();
        this.initializeMiddlewares();
        this.initializeControllers();
    }

    get httpPort(): number {
        return this._httpPort;
    }

    set httpPort(value: number) {
        if (value && value !== this._httpPort) {
            this._httpPort = value;
        }
    }

    get httpsPort(): number {
        return this._httpsPort;
    }

    set httpsPort(value: number) {
        if (value && value !== this._httpsPort) {
            this._httpsPort = value;
        }
    }

    get viewEngine(): string {
        return this._viewEngine;
    }

    set viewEngine(value: string) {
        if (value && value !== this._viewEngine) {
            this._viewEngine = value;
        }
    }

    get publicFolder(): string {
        return this._publicFolder;
    }

    set publicFolder(value: string) {
        if (value && value !== this._publicFolder) {
            this._publicFolder = value;
        }
    }

    get viewsFolder(): string {
        return this._viewsFolder;
    }

    set viewsFolder(value: string) {
        if (value && value !== this._viewsFolder) {
            this._viewsFolder = value;
        }
    }

    get keyFilePath(): string {
        return this._keyFilePath;
    }

    set keyFilePath(value: string) {
        if (value && value !== this._keyFilePath) {
            this._keyFilePath = value;
        }
    }

    get certFilePath(): string {
        return this._certFilePath;
    }

    set certFilePath(value: string) {
        if (value && value !== this._certFilePath) {
            this._certFilePath = value;
        }
    }

    get dataClient(): DataClientBase {
        return this._dataClient;
    }

    set dataClient(value: DataClientBase) {
        if (value && value !== this._dataClient) {
            this._dataClient = value;
        }
    }

    protected initializeControllers() {
        if (this._controllers) {
            this._controllers.forEach((c) => {
                this._app.use(c.baseUrl, c.router);
            });
        }
    }

    protected initializeMiddlewares() {
        if (this._middlewares) {
            this._middlewares.forEach((m) => {
                if (m instanceof MiddlewareBase) {
                    this._app.use(m.handle);
                } else {
                    this._app.use(m);
                }
            });
        }

        // Add database client to response object
        this._app.use(this.addDatabaseClientToResponseMiddleware(this._dataClient));

        // Add user object to session
        this._app.use(this.addUserToSessionMiddleware);
    }

    private addDatabaseClientToResponseMiddleware(dataClient: DataClientBase): e.Handler {
        return  (req: e.Request, res: e.Response, next: e.NextFunction) => {
            res.locals.dbClient = dataClient;
            next();
        };
    }

    private addUserToSessionMiddleware(req: e.Request, res: e.Response, next: e.NextFunction) {
        if (!req.session.user) {
            req.session.user = null;
        }

        next();
    }

    protected intitializeViews() {
        this._app.set('views', path.join(__dirname, this._viewsFolder));
        this._app.set('view engine', this._viewEngine);
    };

    protected initializeStatic() {
        this._app.use(e.static(path.join(__dirname, this._publicFolder)))
    }

    private createHttpServer(listener: RequestListener): HttpServer {
        return createHttpServer(listener);
    }

    private createHttpsServer(listener: RequestListener): HttpsServer {
        return createHttpsServer({
            key: fs.readFileSync(this._keyFilePath),
            cert: fs.readFileSync(this._certFilePath)
        }, listener);
    }

    protected createServers() {
        if (this._httpsPort) {
            this._httpsServer = this.createHttpsServer(this._app);
        }

        this._httpServer = this.createHttpServer(this._httpsServer ? (req: IncomingMessage, res: ServerResponse) => {
            const httpsHost = req.headers.host.replace(`${this._httpPort}`, `${this._httpsPort}`);
            redirect(res, `https://${httpsHost}${req.url}`);
        } : this._app);
    }

    public start() {
        this.createServers();
        this._httpServer.listen(this._httpPort, () => {
            // tslint:disable-next-line:no-console
            console.log(`HTTP server is listening on http://localhost:${this._httpPort}/`);
        });
        if (this._httpsServer) {
            this._httpsServer.listen(this._httpsPort, () => {
                // tslint:disable-next-line:no-console
                console.log(`HTTPS server is listening on https://localhost:${this._httpsPort}/`);
            });
        }
    }
}
