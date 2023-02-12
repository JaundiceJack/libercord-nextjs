import { SetStateAction } from "react";

interface ValidationProps {
  setErrMsgs: (value: SetStateAction<string[]>) => void;
  errMsgs: string[];
  location: string;
  category: string;
  amount: string;
}

export const invalidEntries = ({
  setErrMsgs,
  errMsgs,
  location,
  category,
  amount,
}: ValidationProps): boolean => {
  let errFound = false;
  if (location === "") {
    errFound = true;
    setErrMsgs([...errMsgs, "Expense location required."]);
  }
  if (category === "") {
    errFound = true;
    setErrMsgs([...errMsgs, "Expense category required."]);
  }
  if (amount === "" || amount === null) {
    errFound = true;
    setErrMsgs([...errMsgs, "Expense amount required."]);
  }
  if (isNaN(Number(amount))) {
    errFound = true;
    setErrMsgs([...errMsgs, "Expense amount must be a number."]);
  }
  return errFound;
};
