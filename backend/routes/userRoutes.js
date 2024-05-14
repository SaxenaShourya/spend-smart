import { Router } from "express";
import { registerUser } from "../controllers/userController.js";

const router = Router();

router.route("/").get(registerUser);

export default router;
