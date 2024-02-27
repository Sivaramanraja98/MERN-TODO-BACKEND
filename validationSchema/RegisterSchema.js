const {check} = require("express-validator");

const RegisterSchema = [
    check("name").trim().isAlpha().withMessage("Name Should be Albhabets only"),

    check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username Should be Alphanumeric character")
    .trim()
    .isLength({ min: 6, max: 32 }),

    check("password", "Password is required")
    .isLength({ min: 6, max: 32 })
    .trim(),

    check("email", "Email is required").exists().isEmail(),
];

module.exports =RegisterSchema;