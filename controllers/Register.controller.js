const { validationResult } = require("express-validator");
const jsonGenerate = require("../utils/helpers");
const { StatusCode } = require("../utils/constant");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Validation error",
          errors.mapped()
        )
      );
    }

    const { name, username, email, password } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "User with the same email or username already exists"
        )
      );
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Save to DB
    const newUser = new User({
      name,
      username,
      email,
      password: hashPassword,
    });

    const result = await newUser.save();

    const token = jwt.sign({ userId: result._id }, process.env.TOKEN_SECRET);

    res.json(
      jsonGenerate(StatusCode.SUCCESS, "Registration successful", {
        userId: result._id,
        token: token,
      })
    );
  } catch (error) {
    res.json(
      jsonGenerate(
        StatusCode.INTERNAL_SERVER_ERROR,
        "Internal server error",
        error.mapped()
      )
    );
  }
};

module.exports = Register;
