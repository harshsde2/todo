const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  // console.log("request =>", JSON.stringify(req.body, null, 2));
  const errors = validationResult(req);
  // console.log("errors =>", JSON.stringify(errors, null, 2));
  if (!errors.isEmpty()) {
    return res.status(500).json({
      message: "Validation Error",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = validate;
