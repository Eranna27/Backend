const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    companyName: { type: String, required: true },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      default: "User",
    },
    isAgency: {
      type: Boolean,
      default: false
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, required: true },
  },
  {
    collection: "Roles",
    versionKey: false,
  }
);

// Token Generation

authSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id, role: this.role }, SECRET_KEY);
    return `Bearer ${token}`;
  } catch (error) {
    console.error("Token Generation Error:", error);
    throw new Error("Token generation error");
  }
};

const roleModel = mongoose.model("Roles", authSchema);

module.exports = roleModel;
