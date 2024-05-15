import Expense from "../models/expenseModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Controller function to add new expense
export const addExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const newExpense = new Expense({
    user: req.user._id,
    title,
    amount,
    category,
    description,
    date,
  });

  await newExpense.save();

  return res
    .status(201)
    .json({ message: "Expense added successfully", expense: newExpense });
});
