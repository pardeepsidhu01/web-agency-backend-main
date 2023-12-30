import { Router } from "express";
import {
    createContact,
    deleteContact,
    updateOneState,
} from "../controllers/contactController";
import { contactCreateSchema } from "../validators/contactValidators";
import sendValidationErrors from "../utils/sendValidationError";
import { checkAuthenticationAsAdmin } from "../utils/checkAuthentication";
const routes = Router();

routes
    .route("/create")
    .post(contactCreateSchema, sendValidationErrors, createContact);

routes.route("/delete/:id").post(checkAuthenticationAsAdmin, deleteContact);
routes.route("/update/:id").post(checkAuthenticationAsAdmin, updateOneState);

const contactRoutes = routes;
export default contactRoutes;
