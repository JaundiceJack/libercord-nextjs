import type { UserProp } from "../types";

interface EmailType {
  email: string;
}
interface PasswordType {
  password: string;
}
interface InitialSavingsType {
  initialSavings?: number;
}

export type CreateUser = EmailType & PasswordType & InitialSavingsType;
export type FindUser = EmailType;
export type ValidateUser = UserProp & PasswordType;
