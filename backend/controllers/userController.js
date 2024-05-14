import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import generateHash from "../utils/generateHash.js";
import generateCookie from "../utils/generateCookie.js";

// Controller function to register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res
      .status(400)
      .json({ error: "Email is already Registered. Please login instead!" });
  }

  const userNameExists = await User.findOne({ username });
  if (userNameExists) {
    return res.status(400).json({ error: "Username is already taken!" });
  }

  const hashedPassword = await generateHash(password);

  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();

  await generateCookie(res, newUser._id);
  res.status(200).json({
    message: "User registered successfully. Please verify your email!",
    user: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      verified: newUser.verified,
    },
  });
});
