const express = require("express");
const router = new express.Router();

// Role Routers

const roleRouters = require("./Authentication/RoleRouters");
router.use(roleRouters);





module.exports = router;
