const express = require("express");
const passport = require("passport");
const roleRouters = new express.Router();
const roleController = require("../../Controllers/Authentication/RoleController");

// Login
roleRouters.get("/", (req, res) => {
    res.send("Backend is live 🚀");
});

roleRouters.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Google Verification

roleRouters.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: `${process.env.WEB_URL}/login`,
    }),
    (req, res) => {
        const user = req.user;
        res.redirect(
            `${process.env.WEB_URL}/auth/success?token=${user.token}&userId=${user._id}&role=${user.role}&email=${user.email}`
        );
    }
);

roleRouters.post("/login", roleController.login);
roleRouters.post("/register", roleController.register);

module.exports = roleRouters;
