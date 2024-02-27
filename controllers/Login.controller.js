const { validationResult } = require("express-validator");
const User = require("../models/User");
const jsonGenerate = require("../utils/helpers");
const { StatusCode } = require("../utils/constant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
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

  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username: username });

    // Check if the user exists
    if (!user) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or Password is Incorrect"
        )
      );
    }

    // Verify the password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or Password is Incorrect"
        )
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

    res.json(
      jsonGenerate(StatusCode.SUCCESS, "Login successful", {
        userId: user._id,
        token: token,
      })
    );
  } catch (error) {
    console.error("Error during login:", error);
    res.json(
      jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, "Internal server error")
    );
  }
};

module.exports = Login;
