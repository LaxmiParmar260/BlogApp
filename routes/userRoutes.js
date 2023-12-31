const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");
const { userUploads } = require("../middlewares/userImageStorage");
const {
  registerUserValidation,
  userLoginValidation,
} = require("../validations/user/userDataValidation");

userRouter.post(
  "/create",
  userUploads.single("profilePic"),
  registerUserValidation,
  userController.createUser
);
userRouter.post("/login", userLoginValidation, userController.userLogIn);
userRouter.post("/resetpassword/:id/:token", userController.resetPassword);
userRouter.post("/resetpasswordemail", userController.sendUserPasswordEmail);

module.exports = userRouter;
