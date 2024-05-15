import { Router } from "express";
import {
  addIncome,
  updateIncome,
  deleteIncome,
  getIncomes,
  getAllIncomes,
} from "../controllers/incomeController.js";

import {
  validateTitleLength,
  validateDescriptionLength,
  validateIncomeCategory,
  validateAmount,
  validateDate,
} from "../utils/validations.js";
import validate from "../middlewares/validate.js";

const router = Router();

router
  .route("/")
  .get(getIncomes)
  .post(
    validate({
      title: validateTitleLength,
      description: validateDescriptionLength,
      amount: validateAmount,
      category: validateIncomeCategory,
      date: validateDate,
    }),
    addIncome
  );

router.get("/all", getAllIncomes);

router.route("/:id").put(updateIncome).delete(deleteIncome);

export default router;
