require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./Config/DBConnect");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./Routes/Routers");
const passport = require("./Controllers/Authentication/GoogleAuthController");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(router);
app.use(passport.initialize());

// Server Starting

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
