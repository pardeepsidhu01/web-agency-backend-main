import { validationResult, body } from "express-validator";

export const userCreateSchema = [
    body("email")
        .isEmail()
        .withMessage("Email must be valid")
        .notEmpty()
        .withMessage("Email is required"),
    body("password").notEmpty().withMessage("password is required"),
    body("name")
        .isLength({
            min: 3,
        })
        .withMessage("Name be must of 3 characters"),
];

export const userLoginSchema = [
    body("email")
        .isEmail()
        .withMessage("Email must be valid")
        .notEmpty()
        .withMessage("Email is required"),
    body("password").notEmpty().withMessage("password is required"),
];
