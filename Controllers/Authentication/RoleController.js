const roleModel = require("../../Models/Authentication/RoleModel");
const {
  LOGIN_REQUIRED_FIELDS,
  ERROR_MESSAGES,
  RESPONSE_MESSAGES,
  REGISTRATION_REQUIRED_FIELDS
} = require("../../Common/Constants");
const {
  getMissingFields,
} = require("../../Common/Validators");
const {
  sendErrorResponse,
  sendLoginSuccessResponse,
  sendCreateSuccessResponse,
} = require("../../Common/Responses");
const STATUS = require("../../Common/StatusCodes");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");


// Login

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const missingFields = getMissingFields(req.body, LOGIN_REQUIRED_FIELDS);

  if (missingFields.length > 0) {
    return sendErrorResponse(
      res,
      STATUS.UNPROCESSABLE_ENTITY,
      `The following fields are required: ${missingFields.join(", ")}`
    );
  }

  try {
    const validateUser = await roleModel.findOne({ email });

    if (validateUser) {
      const isMatch = await bcrypt.compare(password, validateUser.password);

      if (!isMatch) {
        return sendErrorResponse(
          res,
          STATUS.UNPROCESSABLE_ENTITY,
          ERROR_MESSAGES.INVALID_CREDENTIALS_CHECK
        );
      } else {
        const token = await validateUser.generateAuthToken();

        const user = {
          ID: validateUser._id,
          name: validateUser.name,
          email: validateUser.email,
        };

        return sendLoginSuccessResponse(
          res,
          STATUS.OK,
          RESPONSE_MESSAGES.LOGIN_SUCCESS,
          user,
          token
        );
      }
    } else {
      return sendErrorResponse(
        res,
        STATUS.UNPROCESSABLE_ENTITY,
        ERROR_MESSAGES.INVALID_EMAIL
      );
    }
  } catch (error) {
    console.error(error);
    return sendErrorResponse(
      res,
      STATUS.INTERNAL_SERVER_ERROR,
      ERROR_MESSAGES.LOGIN_FAILED
    );
  }
};


exports.register = async (req, res) => {
  const { name, email, password, companyName, mobileNumber, isAgency } = req.body;
  const missingFields = getMissingFields(
    req.body,
    REGISTRATION_REQUIRED_FIELDS
  );

  if (missingFields.length > 0) {
    return sendErrorResponse(
      res,
      STATUS.UNPROCESSABLE_ENTITY,
      `The following fields are required: ${missingFields.join(", ")}`
    );
  }

  try {
    const existingUser = await roleModel.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(
        res,
        STATUS.UNPROCESSABLE_ENTITY,
        ERROR_MESSAGES.ALREADY_EXISTS(existingUser.email)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const currentISTDateString = moment
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    const newUser = new roleModel({
      name,
      email,
      mobileNumber,
      companyName,
      password: hashedPassword,
      isAgency: isAgency || false,
      createdDate: currentISTDateString,
      updatedDate: currentISTDateString
    });

    await newUser.save();
    return sendCreateSuccessResponse(
      res,
      STATUS.CREATED,
      RESPONSE_MESSAGES.REGISTRATION_SUCCESS(name),
      { userID: newUser._id }
    );
  } catch (error) {
    console.error("Error Registering user:", error.message);
    return sendErrorResponse(
      res,
      STATUS.INTERNAL_SERVER_ERROR,
      ERROR_MESSAGES.REGISTRATION_FAILED
    );
  }
};

// git init
// git add .
// git commit -m "Initial commit"
// git branch -M main
// git remote add origin https://github.com/Eranna27/Backend.git
// git push -u origin main






