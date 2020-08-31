import ControllerBase from "../core/controllerbase";
import { Request, Response } from "express";
import { ValidatedUser } from "../models/usermodels";

export class AdminController extends ControllerBase {

    private static baseUrl: string;

    constructor(baseUrl: string) {
        super(baseUrl);

        AdminController.baseUrl = baseUrl;
    }

    protected initializeRoutes(): void {
        this.router.get('/login', this.getLogin);
        this.router.post('/login', this.postLogin);
        this.router.get('/logout', this.getLogout);
        this.router.get('/dashboard', this.isAuthenticated('/admin/login'), this.getDashboard);
        this.router.get('/', this.getIndex);
    }

    private getIndex(req: Request, res: Response) {
        let user = req.session.user;
        let isAdmin = user && user.roles.includes('ADMIN');

        if (!user || !isAdmin) {
            res.redirect(`${AdminController.baseUrl}/login`);
        } else {
            res.redirect(`${AdminController.baseUrl}/dashboard`);
        }
    }

    private getLogin(req: Request, res: Response) {
        res.render('admin/login', {msg: null, user: req.session.user});
    }

    private getLogout(req: Request, res: Response) {
        req.session.user = null;
        res.redirect(`${AdminController.baseUrl}/login`);
    }

    private getDashboard(req: Request, res: Response) {
        res.render('admin/dashboard', {user: req.session.user});
    }

    private postLogin(req: Request, res: Response) {
        let {username, password} = req.body;
        if (username === 'admin' && password === 'admin') {
            // req.session.user = {username: 'admin', fullName: 'Administrator', roles: ['ADMIN']}
            // res.locals.authenticated = req.session.user && (req.session.user.roles.includes('ADMIN'));
            req.session.user = new ValidatedUser(1, 'admin', 'Administrator', true, false, null);
            res.locals.authenticated = req.session.user && req.session.user.isAdmin;
            res.redirect(`${AdminController.baseUrl}/dashboard`);
        } else {
            res.render('admin/login', {msg: 'Invalid login name or password', user: null});
        }
    }
}
