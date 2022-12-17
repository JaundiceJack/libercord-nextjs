import Local from "passport-local";
import { UserType } from "../models//User";
import { findUserPrivateInfo, validatePassword } from "../handlers/userHandler";

export const localStrategy = new Local.Strategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user: UserType = await findUserPrivateInfo(email);
      if (user && (await validatePassword(user, password))) {
        // Filter out password info before returning it
        done(null, {
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      } else done(new Error("Invalid email or password."));
    } catch (e) {
      console.log("Local Strategy Error: ", e);
      done(e);
    }
  }
);
