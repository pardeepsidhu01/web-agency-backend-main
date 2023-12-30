import { NextFunction, Request, Response } from "express";
import catchAsync from "./catchAsync";
import { validationResult } from "express-validator";
import AppError from "./AppError";

const sendValidationErrors = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        let message = "";
        if (!errors.isEmpty()) {
            errors.array().forEach((e) => {
                message = message + ` ${e.msg}`;
            });
            next(new AppError(message, 400));
        } else {
            next();
        }
    }
);

export default sendValidationErrors;
