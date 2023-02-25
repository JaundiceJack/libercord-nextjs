import { Schema, Types, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType extends Document {
  _id: Types.ObjectId;
  email: string;
  password?: string;
  isAdmin: boolean;
  matchPassword?: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password: string) {
  // Compare the entered password to the encrypted password
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  // Skip the password encyption if the password was not changed
  if (!this.isModified("password")) {
    next();
  }
  // Encrypt the password before saving a new user/modifying password
  const salt = await bcrypt.genSalt(10);
  if (this.password) this.password = await bcrypt.hash(this.password, salt);
});

export default models.User || model("User", userSchema);
