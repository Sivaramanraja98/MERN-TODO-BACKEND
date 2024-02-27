const express = require("express");
const RegisterSchema = require("../validationSchema/RegisterSchema");
const Register = require("../controllers/Register.controller");
const LoginSchema = require("../validationSchema/LoginSchema");
const Login = require("../controllers/Login.controller");

const apiRoute = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/login", LoginSchema, Login);

module.exports = apiRoute;
