import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  resetPassword,
} from "../controllers/userController.js";

import {
  validateEmailAddress,
  validateUsernameLength,
  validatePasswordLength,
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

export default router;
