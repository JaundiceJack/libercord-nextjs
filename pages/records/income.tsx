import { FC } from "react";

interface IncomeProps {
  totalIncome: number;
}

const Income: FC<IncomeProps> = ({ totalIncome }) => {
  return (
    <>
      <h1>{totalIncome}</h1>
    </>
  );
};

export default Income;
