import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
    email: string;
    name: string;
    password: string;
    role: "user" | "admin";
    matchPasswords: (
        givenPassword: string,
        currentPassword: string
    ) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.matchPasswords = async function (
    givenPassword: string,
    currentPassword: string
) {
    const isMatch = await bcrypt.compare(givenPassword, currentPassword);
    return isMatch;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
