import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the entered password to the encrypted password
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  // Skip the password encyption if the password was not changed
  if (!this.isModified("password")) {
    next();
  }
  // Encrypt the password before saving a new user/modifying password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.User || mongoose.model("User", userSchema);
