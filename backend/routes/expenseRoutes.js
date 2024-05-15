import { Router } from "express";
import { addExpense, updateExpense } from "../controllers/expenseController.js";
import validate from "../middlewares/validate.js";

import {
  validateTitleLength,
  validateDescriptionLength,
  validateExpenseCategory,
  validateAmount,
  validateDate,
} from "../utils/validations.js";

const router = Router();

router.route("/").post(
  validate({
    title: validateTitleLength,
    description: validateDescriptionLength,
    amount: validateAmount,
    category: validateExpenseCategory,
    date: validateDate,
  }),
  addExpense
);

router.route("/:id").put(updateExpense);

export default router;
