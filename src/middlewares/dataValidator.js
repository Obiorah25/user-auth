const { body, validationResult, check } = require("express-validator");

const validateUser = (req, res) => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email address.")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 charcters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ];
};

const checkValidationErrors = (req, res, next) => {
  // Get validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      errors: errors.errors[0].msg,
    });
  }
  // If no errors, proceed to create new user
  next();
};

module.exports = { validateUser, checkValidationErrors };
