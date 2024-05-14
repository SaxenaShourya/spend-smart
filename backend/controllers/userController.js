import asyncHandler from "../middlewares/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  res.json({ success: "This is a user controller!" });
});
