import crypto from "crypto";

type UserType = {
  _id: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  matchPassword?: (password: string) => Promise<boolean>;
};

export default UserType;
