import { SetStateAction } from "react";

interface ValidationProps {
  setErrMsgs: (value: SetStateAction<string[]>) => void;
  errMsgs: string[];
  category: string;
  unitsPurchased: string;
}

export const invalidEntries = ({
  setErrMsgs,
  errMsgs,
  category,
  unitsPurchased,
}: ValidationProps): boolean => {
  let errFound = false;
  if (category === "") {
    errFound = true;
    setErrMsgs([...errMsgs, "Asset category required."]);
  }
  if (unitsPurchased === "" || unitsPurchased === null) {
    errFound = true;
    setErrMsgs([...errMsgs, "Asset units purchased required."]);
  }
  if (isNaN(Number(unitsPurchased))) {
    errFound = true;
    setErrMsgs([...errMsgs, "Asset units purchased must be a number."]);
  }
  return errFound;
};
