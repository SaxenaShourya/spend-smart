import Income from "../models/incomeModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import {
  validateTitleLength,
  validateDescriptionLength,
  validateIncomeCategory,
  validateAmount,
  validateDate,
  validatePaginationParams,
} from "../utils/validations.js";

// Controller function to add new income
export const addIncome = asyncHandler(async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const newIncome = new Income({
    user: req.user._id,
    title,
    amount,
    category,
    date,
    description,
  });

  await newIncome.save();

  return res
    .status(201)
    .json({ message: "Income added successfully", income: newIncome });
});

// Controller function to update an income
export const updateIncome = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);

  if (!income) {
    return res.status(404).json({ error: "Income not found!" });
  }

  const { title, amount, category, description, date } = req.body;

  if (!title && !amount && !category && !description && !date) {
    return res
      .status(400)
      .json({ error: "At least one field is required for update!" });
  }
  if (
    title === income.title &&
    amount === income.amount &&
    category === income.category &&
    description === income.description &&
    date === income.date
  ) {
    return res.status(400).json({ error: "No changes detected!" });
  }

  if (title) {
    const error = validateTitleLength(title);
    if (error) {
      return res.status(400).json({ error: error });
    }
    income.title = title;
  }
  if (amount) {
    const error = validateAmount(amount);
    if (error) {
      return res.status(400).json({ error: error });
    }
    income.amount = amount;
  }
  if (description) {
    const error = validateDescriptionLength(description);
    if (error) {
      return res.status(400).json({ error: error });
    }
    income.description = description;
  }
  if (date) {
    const error = validateDate(date);
    if (error) {
      return res.status(400).json({ error: error });
    }
    income.date = date;
  }
  if (category) {
    const error = validateIncomeCategory(category);
    if (error) {
      return res.status(400).json({ error: error });
    }
    income.category = category;
  }

  const updatedIncome = await income.save();

  return res
    .status(200)
    .json({ message: "Income updated successfully!", income: updatedIncome });
});

// Controller function to delete an income
export const deleteIncome = asyncHandler(async (req, res) => {
  const income = await Income.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!income) {
    return res.status(404).json({ error: "Income not found!" });
  }

  return res.status(200).json({ message: "Income deleted successfully!" });
});

// Controller function to get all incomes
export const getIncomes = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const paginationError = validatePaginationParams(page, pageSize);
  if (paginationError) {
    return res.status(400).json({ error: paginationError });
  }

  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  const incomes = await Income.find({ user: req.user._id })
    .skip(skip)
    .limit(limit);
  if (!incomes || incomes.length === 0) {
    return res.status(404).json({ message: "No incomes found!" });
  }

  const totalCount = await Income.countDocuments({ user: req.user._id });
  const totalPages = Math.ceil(totalCount / pageSize);

  const totalExpenses = await Income.find({ user: req.user._id });

  const totalIncome = totalExpenses.reduce(
    (acc, income) => acc + income.amount,
    0
  );

  return res.status(200).json({
    message: "All incomes retrieved successfully!",
    incomes,
    totalIncome,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      pageSize,
    },
  });
});

// Controller function to get all incomes
export const getAllIncomes = asyncHandler(async (req, res) => {
  const incomes = await Income.find({ user: req.user._id });

  if (!incomes || incomes.length === 0) {
    return res.status(404).json({ message: "No incomes found!" });
  }

  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);

  return res.status(200).json({
    message: "All incomes retrieved successfully!",
    incomes,
    totalIncome,
  });
});
