import { SetStateAction } from "react";

interface ValidationProps {
  setErrMsgs: (value: SetStateAction<string[]>) => void;
  errMsgs: string[];
  source: string;
  category: string;
  amount: string;
}

export const invalidEntries = ({
  setErrMsgs,
  errMsgs,
  source,
  category,
  amount,
}: ValidationProps): boolean => {
  let errFound = false;
  if (source === "") {
    errFound = true;
    setErrMsgs([...errMsgs, "Income source required."]);
  }
  if (category === "") {
    errFound = true;
    setErrMsgs([...errMsgs, "Income category required."]);
  }
  if (amount === "" || amount === null) {
    errFound = true;
    setErrMsgs([...errMsgs, "Income amount required."]);
  }
  if (isNaN(Number(amount))) {
    errFound = true;
    setErrMsgs([...errMsgs, "Income amount must be a number."]);
  }
  return errFound;
};
