import Expense from "../models/expenseModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import {
  validateTitleLength,
  validateDescriptionLength,
  validateExpenseCategory,
  validateAmount,
  validateDate,
  validatePaginationParams,
} from "../utils/validations.js";

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

// Controller function to update an expense
export const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({ error: "Expense not found!" });
  }

  const { title, amount, category, description, date } = req.body;

  if (!title && !amount && !category && !description && !date) {
    return res
      .status(400)
      .json({ error: "At least one field is required for update!" });
  }
  if (
    title === expense.title &&
    amount === expense.amount &&
    category === expense.category &&
    description === expense.description &&
    date === expense.date
  ) {
    return res.status(400).json({ error: "No changes detected!" });
  }

  if (title) {
    const error = validateTitleLength(title);
    if (error) {
      return res.status(400).json({ error: error });
    }
    expense.title = title;
  }
  if (amount) {
    const error = validateAmount(amount);
    if (error) {
      return res.status(400).json({ error: error });
    }
    expense.amount = amount;
  }
  if (description) {
    const error = validateDescriptionLength(description);
    if (error) {
      return res.status(400).json({ error: error });
    }
    expense.description = description;
  }
  if (date) {
    const error = validateDate(date);
    if (error) {
      return res.status(400).json({ error: error });
    }
    expense.date = date;
  }
  if (category) {
    const error = validateExpenseCategory(category);
    if (error) {
      return res.status(400).json({ error: error });
    }
    expense.category = category;
  }

  const updatedExpense = await expense.save();

  return res.status(200).json({
    message: "Expense updated successfully!",
    expense: updatedExpense,
  });
});

// Controller function to delete an expense
export const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!expense) {
    return res.status(404).json({ error: "Expense not found!" });
  }

  return res.status(200).json({ message: "Expense deleted successfully!" });
});

// Controller function to get all expenses
export const getExpenses = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const paginationError = validatePaginationParams(page, pageSize);
  if (paginationError) {
    return res.status(400).json({ error: paginationError });
  }

  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  const expenses = await Expense.find({ user: req.user._id })
    .skip(skip)
    .limit(limit);
  if (!expenses || expenses.length === 0) {
    return res.status(404).json({ message: "No expenses found!" });
  }

  const totalCount = await Expense.countDocuments({ user: req.user._id });
  const totalPages = Math.ceil(totalCount / pageSize);

  const totalExpenses = await Expense.find({ user: req.user._id });

  const totalExpense = totalExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return res.status(200).json({
    message: "All expenses retrieved successfully!",
    expenses,
    totalExpense,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      pageSize,
    },
  });
});

// Controller function to get all expenses
export const getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });

  if (!expenses || expenses.length === 0) {
    return res.status(404).json({ message: "No expenses found!" });
  }

  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  return res.status(200).json({
    message: "All expenses retrieved successfully!",
    expenses,
    totalExpense,
  });
});
