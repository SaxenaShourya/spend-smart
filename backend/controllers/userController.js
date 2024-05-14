import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import {
  validateEmailAddress,
  validateUsernameLength,
} from "../utils/validations.js";

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

// Controller function to log in a user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({
      error: "Email is not registered. Please register!",
    });
  }

  if (!existingUser.verified) {
    return res.status(401).json({
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        verified: existingUser.verified,
      },
      error:
        "Email is not verified. Please verify your email via otp to proceed.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid user credentials!" });
  }

  await generateCookie(res, existingUser._id);
  return res.status(200).json({
    message: "Logged In Successfully!",
    user: {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      verified: existingUser.verified,
    },
  });
});

// Controller function to logout a user
export const logoutCurrentUser = asyncHandler(async (req, res) => {
  const token = req.cookies.session;
  if (token) {
    res.clearCookie("session");

    return res.status(200).json({ message: "Logged Out Successfully!" });
  } else {
    return res.status(401).json({
      error: "You must be authenticated to access this resource!",
    });
  }
});

// Controller function to get current user profile details.
export const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.status(200).json({
      message: "User details retrieved successfully!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });
  } else {
    return res.status(404).json({ error: "User Not Found!" });
  }
});

// Controller function to update the current user's profile
export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  const { username, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({
      error: "At least one field is required for update!",
    });
  }

  if (username === user.username && email === user.email) {
    return res.status(400).json({ error: "No changes detected!" });
  }

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error:
          "Email is already in use. Please choose a different email address!",
      });
    }
  }

  if (username) {
    const error = validateUsernameLength(username);
    if (error) {
      return res.status(400).json({ error: error });
    }
    user.username = username;
  }
  if (email) {
    const error = validateEmailAddress(email);
    if (error) {
      return res.status(400).json({ error: error });
    }
    user.email = email;
  }

  const updatedUser = await user.save();

  return res.status(200).json({
    message: "Profile updated Successfully!",
    user: {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      verified: updatedUser.verified,
    },
  });
});
