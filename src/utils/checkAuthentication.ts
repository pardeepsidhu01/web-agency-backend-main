import { Request, Response, NextFunction } from "express";

export const checkAuthenticationAsAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        const user: any = req.user;
        res.locals.user = user;
        if (user.role === "admin") {
            return next();
        } else {
            return res.redirect("/login");
        }
    } else {
        return res.redirect("/login");
    }
};
