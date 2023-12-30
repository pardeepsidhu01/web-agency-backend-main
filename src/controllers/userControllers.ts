import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import findAndSendMissingValues from "../utils/findAndSendMissingValues";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";

export const signUpUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = findAndSendMissingValues(
            ["email", "name", "password"],
            req.body
        );

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return next(
                new AppError("User with this email already exists", 400)
            );
        }
        const user = await User.create(data);
        if (!user) {
            return next(new AppError("Something went wrong", 400));
        }
        req.logIn(data, (loginErr) => {
            if (loginErr) {
                return res.redirect("/signup?q=loginFailed");
            }
            // Redirect to a success page or any other desired route
            return res.redirect("/admin");
        });
    }
);

export const loginUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = findAndSendMissingValues(["email", "password"], req.body);

        const user = await User.findOne({ email: data.email });

        if (
            !user ||
            !(await user.matchPasswords(data.password, user.password))
        ) {
            return next(new AppError("Email or password is incorrect", 400));
        }

        const token = jwt.sign(
            {
                id: user.id,
                expiresIn: "90d",
            },
            process.env.JWT_SECRET_KEY as string
        );

        return res.status(201).json({
            message: "Login successful",
            data: {
                user: {
                    name: user.name,
                    role: user.role,
                    token: token,
                },
            },
        });
    }
);
