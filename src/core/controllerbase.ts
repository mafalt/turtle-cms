import { Router } from "express";

export default abstract class ControllerBase {
    private _router: Router;
    private _baseUrl: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
        this._router = Router();

        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): void;

    get router(): Router {
        return this._router;
    }

    get baseUrl(): string {
        return this._baseUrl;
    }
}
