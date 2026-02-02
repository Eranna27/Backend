require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./Config/DBConnect");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./Routes/Routers");
const passport = require("./Controllers/Authentication/GoogleAuthController");
const session = require("express-session");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false, saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

// Server Starting

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
