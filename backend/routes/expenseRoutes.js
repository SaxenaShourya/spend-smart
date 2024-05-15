import { Router } from "express";
import {
  addExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
  getAllExpenses,
} from "../controllers/expenseController.js";
import validate from "../middlewares/validate.js";

import {
  validateTitleLength,
  validateDescriptionLength,
  validateExpenseCategory,
  validateAmount,
  validateDate,
} from "../utils/validations.js";

const router = Router();

router
  .route("/")
  .get(getExpenses)
  .post(
    validate({
      title: validateTitleLength,
      description: validateDescriptionLength,
      amount: validateAmount,
      category: validateExpenseCategory,
      date: validateDate,
    }),
    addExpense
  );

router.get("/all", getAllExpenses);

router.route("/:id").put(updateExpense).delete(deleteExpense);

export default router;
