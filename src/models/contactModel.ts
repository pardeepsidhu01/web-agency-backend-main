import mongoose, { Document, Schema } from "mongoose";
interface IContact extends Document {
    name: string;
    email: string;
    query: string;
    status: "new" | "pending_to_contact" | "completed";
    phoneNumber?: string;
}

const contactSchema = new mongoose.Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        query: {
            type: String,
            required: [true, "query is required"],
        },
        status: {
            type: String,
            enum: ["new", "pending_to_contact", "completed"],
            default: "new",
        },
        phoneNumber: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
