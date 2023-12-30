import { body } from "express-validator";

export const contactCreateSchema = [
    body("email")
        .isEmail()
        .withMessage("Email must be valid")
        .notEmpty()
        .withMessage("Email is required"),
    body("name")
        .isLength({
            min: 3,
        })
        .withMessage("Name be must of 3 characters"),
    body("query")
        .isLength({
            min: 10,
        })
        .withMessage("Name be must of 10 characters"),
    body("phoneNumber")
        .isLength({
            min: 10,
        })
        .withMessage("PhoneNumber be must of 10 characters"),
];
