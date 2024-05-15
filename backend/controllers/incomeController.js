import Income from "../models/incomeModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

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
