import type { UserProp } from "../types";

interface EmailType {
  email: string;
}
interface PasswordType {
  password: string;
}

export type CreateUser = EmailType & PasswordType;
export type FindUser = EmailType;
export type ValidateUser = UserProp & PasswordType;
