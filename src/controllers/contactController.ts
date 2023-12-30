import { Response, Request, NextFunction } from "express";
import Contact from "../models/contactModel";
import catchAsync from "../utils/catchAsync";
import findAndSendMissingValues from "../utils/findAndSendMissingValues";
import AppError from "../utils/AppError";

export const createContact = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = findAndSendMissingValues(
            ["name", "email", "query","phoneNumber"],
            req.body
        );
        const contact = await Contact.create(data);
        if (!contact) {
            return next(new AppError("Something went wrong", 400));
        }
        const referringPage: string | undefined = req.get("referer");
        req.flash("message", "Your response is recorded successfully");
        if (referringPage?.includes("/contact")) {
            return res.redirect("/contact");
        } else {
            return res.redirect("/");
        }
    }
);

export const deleteContact = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        if (!id) {
            return next(new AppError("Id is required", 400));
        }

        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return next(new AppError("Contact not found", 404));
        }
        return res.redirect("/admin");
    }
);

export const updateOneState = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        if (!id) {
            return next(new AppError("Id is required", 400));
        }
        const contact = await Contact.findById(id);

        if (!contact) {
            return next(new AppError("Contact not found", 404));
        }
        if (contact.status === "new") {
            await Contact.findByIdAndUpdate(id, {
                status: "pending_to_contact",
            });
        } else if (contact.status === "pending_to_contact") {
            await Contact.findByIdAndUpdate(id, {
                status: "completed",
            });
        }

        // return res.status(201).
        return res.redirect("/admin");
        // if
    }
);
