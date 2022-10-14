import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import dbConnect from "../utils/dbConnect";
import UserType from "../types/UserType";
import User from "../models/User";

// Make a new user and return them with private info filtered out
export const createUser = async (
  email: string,
  password: string
): Promise<UserType> => {
  try {
    // Validate credentials
    if (email === "") throw new Error("Email not submitted.");
    if (password.length < 8)
      throw new Error("Password must be at least 8 characters in length");

    // Connect to a DB, make sure the account's not take, and create the new user
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = await User.create({ email, password });
      if (newUser) {
        return {
          _id: newUser._id,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        };
      } else throw new Error("User creation failed.");
    } else throw new Error("A user with that email already exists.");
  } catch (e) {
    throw e;
  }
};

// Get a user with private info filtered out
export const findUser = async (email: string): Promise<any> => {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (user) {
      return {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
    } else throw new Error(`User with email: ${email} not found.`);
  } catch (e) {
    throw e;
  }
};

// Get a user's info including password for authentication
export const findUserPrivateInfo = async (email: string): Promise<any> => {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (user) {
      return user;
    } else throw new Error(`User with email: ${email} not found.`);
  } catch (e) {
    throw e;
  }
};

// Check if the password input matches the given user's
export const validatePassword = async (
  user: UserType,
  password: string
): Promise<boolean> => {
  if (user.matchPassword && (await user.matchPassword(password))) return true;
  else return false;
};
