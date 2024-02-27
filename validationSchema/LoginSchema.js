const { check } = require("express-validator");

const LoginSchema = [
  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username Should be Alphanumeric character")
    .trim()
    .isLength({ min: 6, max: 32 }),

  check("password", "Password is required")
    .isLength({ min: 6, max: 32 })
    .trim(),
];

module.exports = LoginSchema;
