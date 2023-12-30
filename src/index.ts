import express from "express";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
// routes only
import userRoutes from "./routes/userRoutes";
import errorController from "./controllers/errorController";
import mongooseConnection from "./utils/mongooseConnection";
import contactRoutes from "./routes/contactRoutes";
import cors from "cors";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import Contact from "./models/contactModel";
import passport from "passport";
import passportConfig from "./utils/passport-config";
import { checkAuthenticationAsAdmin } from "./utils/checkAuthentication";
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
    })
);
passportConfig(passport);

// app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.use("/public", express.static(path.join(__dirname)));
    app.set("view engine", "ejs");
// app.use(express.static(__dirname + "public"));
app.use(express.static(path.join(__dirname, "public")));
mongooseConnection();
app.use(cors());
const PORT = process.env.PORT || 8001;

app.get("/", (req, res, next) => {
    res.render("./index", { messages: req.flash("message") });
});

app.get("/index", (req, res, next) => {
    res.redirect("/");
});
app.get("/about", (req, res, next) => {
    res.render("./about");
});
app.get("/service", (req, res, next) => {
    res.render("./services");
});
app.get("/project", (req, res, next) => {
    res.render("./projects");
});

app.get("/contact", (req, res, next) => {
    res.render("contact", { messages: req.flash("message") });
});

app.get("/admin", checkAuthenticationAsAdmin, async (req, res, next) => {
    const contacts = await Contact.find({}).sort({ createdAt: "desc" });
    res.render("admin/index", { contacts });
});

app.get("/login", async (req, res, next) => {
    res.render("admin/login");
});

app.get("/signup", async (req, res, next) => {
    res.render("admin/signup");
});

app.get("/logout", async (req, res, next) => {
    req.logout(function (err) {
        return res.redirect("/login");
    });
});

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/admin?q=success",
        failureRedirect: "/login?q=failed",
    })
);
app.use("/user", userRoutes);
app.use("/contact", contactRoutes);
app.use(errorController);
app.listen(8000, () => {
    console.log("server is running at " + PORT);
});
