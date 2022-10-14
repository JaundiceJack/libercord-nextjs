import type UserType from "./UserType";

type SessionType = {
  createdAt: number;
  maxAge: number;
} & UserType;

export default SessionType;
