import { Types } from "mongoose";
import type { UserType } from "../models/User";

// Common to multiple handlers
export interface UserProp {
  user: UserType;
}
export interface UserIdProp {
  user: Types.ObjectId | undefined;
}
