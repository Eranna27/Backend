const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: ""
    },
    email: { type: String, default: "", lowercase: true },
    companyName: { type: String, default: "" },
    password: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      default: "",
      default: "User",
    },
    isAgency: {
      type: Boolean,
      default: false
    },
    mobileNumber: {
      type: String,
      default: "",
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    createdDate: { type: String, default: "" },
    updatedDate: { type: String, default: "" },
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
