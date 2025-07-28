const express = require("express");
const router = express.Router();
const { login, signUp } = require("../controllers/authController");
const {
  signupValidator,
  loginValidator,
} = require("../validators/authValidator");
const validate = require("../validators/validate");

router.post("/signup", signupValidator, validate, signUp);
router.post("/login", loginValidator, validate, login);

module.exports = router;
