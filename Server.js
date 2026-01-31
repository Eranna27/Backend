require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("./Config/DBConnect");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./Routes/Routers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "350mb" }));
app.use(router);

// Global File Upload Error

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(200).json({ success: false, error: err.message });
  } else if (err) {
    res.status(200).json({ success: false, error: err.message });
  } else {
    next();
  }
});

// Server Starting

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
