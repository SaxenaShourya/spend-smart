import { Router } from "express";
import { registerUser } from "../controllers/userController.js";

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

export default router;
