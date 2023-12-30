import { Request, Response, NextFunction } from "express";

interface AppError {
    statusCode: number;
    status: string;
    message: string;
    stack?: string;
}

const sendErrorDev = (err: AppError, req: Request, res: Response): void => {
    // console.error("ERROR 💥", err, "this is something from render api");
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const errorController = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    sendErrorDev(err, req, res);
};

export default errorController;
