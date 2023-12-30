import { Router } from "express";
import { loginUser, signUpUser } from "../controllers/userControllers";
import {
    userCreateSchema,
    userLoginSchema,
} from "../validators/userValidators";
import sendValidationErrors from "../utils/sendValidationError";

const routes = Router();

routes
    .route("/signup")
    .post(userCreateSchema, sendValidationErrors, signUpUser);
routes.route("/login").post(userLoginSchema, sendValidationErrors, loginUser);
const userRoutes = routes;
export default userRoutes;
