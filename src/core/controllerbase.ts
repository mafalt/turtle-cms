import { Router } from "express";

export default abstract class ControllerBase {
    private _router: Router;
    private _baseUrl: string;

    protected abstract initializeRoutes(): void;

    get router(): Router {
        return this._router;
    }

    get baseUrl(): string {
        return this._baseUrl;
    }
}
