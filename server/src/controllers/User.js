import User from "../models/User.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateTokens } from "../utils/generateTokens.js";
import bcrypt from "bcrypt";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new apiError(400, "Please provide all fields"));
  }

 const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    return next(new apiError(400, "User already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save()

  res.status(201).json({
    message: "User registered",
    success: true,
    data: {
      ...savedUser._doc,
      password: undefined,
    }

  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new apiError(400, "Please provide all fields"));
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next(new apiError(400, " User does not exist"));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return next(new apiError(400, "Invalid credentials"));
  }

  const payload = {
    userId: user._id,
  };
  
  const { accessToken, refreshToken } = generateTokens(payload);
  
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_SS || "lax",
  };
  
  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  res.status(200).json({
    message: "User logged in",
    success: true,
    data: {
      ...user._doc,
      password: undefined,
    }
  });

});

export const logoutUser = asyncHandler(async (req, res, next) => {

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "User logged out",
    success: true,
  });
});