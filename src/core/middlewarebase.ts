import { Request, Response, NextFunction } from "express";

export default abstract class MiddlewareBase {
    public abstract handle(req: Request, res: Response, next: NextFunction): void;
}
