import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutCurrentUser,
} from "../controllers/userController.js";

import {
  validateEmailAddress,
  validateUsernameLength,
  validatePasswordLength,
} from "../utils/validations.js";

import validate from "../middlewares/validate.js";

const router = Router();

router.route("/").post(
  validate({
    username: validateUsernameLength,
    email: validateEmailAddress,
    password: validatePasswordLength,
  }),
  registerUser
);

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

export default router;
