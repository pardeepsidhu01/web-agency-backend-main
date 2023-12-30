import localStrategy from "passport-local";
import User from "../models/userModel";
function passportConfig(passport: any) {
    const authMyUser = async (email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user || !(await user.matchPasswords(password, user.password))) {
            return done(null, false, { message: "something went wrong" });
        }

        return done(null, user);
    };
    passport.use(
        new localStrategy.Strategy(
            {
                usernameField: "email", // Specify the field name for email
                passwordField: "password", // Specify the field name for password
            },
            authMyUser
        )
    );
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => {
        const data = {
            name: user.name,
            email: user.email,
            role: user.role,
        };
        return done(null, data);
    });
}

export default passportConfig;
