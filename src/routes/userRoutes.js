const express = require("express");
const {
  createNewUser,
  getCurrentUser,
  verifyUserAccount,
} = require("../contollers/userController");
const {
  validateUser,
  checkValidationErrors,
} = require("../middlewares/dataValidator");
const requireSignin = require("../middlewares/requireSignin");
const userRouter = express.Router();
userRouter.post("/", validateUser(), checkValidationErrors, createNewUser);
userRouter.get("/me", requireSignin, getCurrentUser);
userRouter.put("/verify", verifyUserAccount);

module.exports = userRouter;
