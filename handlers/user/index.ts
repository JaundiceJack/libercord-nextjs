import User, { UserType } from "../../models/User";
import dbConnect from "../../mongo/dbConnect";
import { createDefaultCatalog, createDefaultPreferences } from "../defaults";
import type { CreateUser, FindUser, ValidateUser } from "./types";

const validateCredentials = (email: string, password: string) => {
  if (email === "") throw new Error("Email not submitted.");
  if (password.length < 8)
    throw new Error("Password must be at least 8 characters in length");
};

// Make a new user and return them with private info filtered out
export const createUser = async ({
  email,
  password,
  initialSavings,
}: CreateUser) => {
  try {
    validateCredentials(email, password);
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = await User.create({ email, password });
      if (newUser) {
        await createDefaultCatalog({ user: newUser._id });
        await createDefaultPreferences({ user: newUser._id, initialSavings });
        return {
          _id: newUser._id,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        } as UserType;
      } else throw new Error("User creation failed.");
    } else throw new Error("A user with that email already exists.");
  } catch (e) {
    throw e;
  }
};

// Get a user with private info filtered out
export const findUser = async ({ email }: FindUser) => {
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
export const findUserPrivateInfo = async ({ email }: FindUser) => {
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
export const validatePassword = async ({ user, password }: ValidateUser) => {
  if (user.matchPassword && (await user.matchPassword(password))) return true;
  else return false;
};
