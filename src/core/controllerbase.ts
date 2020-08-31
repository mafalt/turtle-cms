import { Router, Request, Response, NextFunction, Handler } from "express";

export default abstract class ControllerBase {
    private _router: Router;
    private _baseUrl: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
        this._router = Router();

        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void;

    protected isAuthenticated(redirectUrl: string): Handler {
        return (req: Request, res: Response, next: NextFunction) => {
            if (req.session.user) {
                next();
            } else {
                res.redirect(redirectUrl);
                res.end();
            }
        }
    }

    get router(): Router {
        return this._router;
    }

    get baseUrl(): string {
        return this._baseUrl;
    }
}
