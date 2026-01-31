const express = require("express");
const roleRouters = new express.Router();
const roleController = require("../../Controllers/Authentication/RoleController");

// Login
router.get("/", (req, res) => {
    res.send("Backend is live 🚀");
});

roleRouters.post("/login", roleController.login);
roleRouters.post("/register", roleController.register);

module.exports = roleRouters;
