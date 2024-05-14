import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  resetPassword,
  sendOTP,
  verifyOTP,
} from "../controllers/userController.js";

import {
  validateEmailAddress,
  validateUsernameLength,
  validatePasswordLength,
  validateOTP,
} from "../utils/validations.js";

import validate from "../middlewares/validate.js";
import authenticateUser from "../middlewares/authenticateUser.js";

const router = Router();

// Route for user registration,updation and getting profile
router
  .route("/")
  .get(authenticateUser, getCurrentUserProfile)
  .post(
    validate({
      username: validateUsernameLength,
      email: validateEmailAddress,
      password: validatePasswordLength,
    }),
    registerUser
  )
  .put(authenticateUser, updateCurrentUserProfile);

// Route for user login
router.route("/login").post(
  validate({
    email: validateEmailAddress,
    password: validatePasswordLength,
  }),
  loginUser
);

// Route for user logout
router.delete("/logout", logoutCurrentUser);

// Route for user password reset
router.put("/reset-password", authenticateUser, resetPassword);

// Route for sending and verifying otp
router.post("/send-otp", validate({ email: validateEmailAddress }), sendOTP);
router.post(
  "/verify-otp",
  validate({ email: validateEmailAddress, otp: validateOTP }),
  verifyOTP
);

export default router;
