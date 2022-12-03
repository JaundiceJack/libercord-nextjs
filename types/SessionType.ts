import type { UserType } from "../models/User";

type SessionType = {
  createdAt: number;
  maxAge: number;
} & UserType;

export default SessionType;
