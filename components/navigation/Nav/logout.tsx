import { FC } from "react";
import NavLink from "./navlink";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useReduxDispatch } from "../../../hooks/useRedux";
import { resetIncome } from "../../../redux/incomeSlice";
import { resetCatalog } from "../../../redux/catalogSlice";
import { resetDate } from "../../../redux/dateSlice";
import { resetExpense } from "../../../redux/expenseSlice";

const Logout: FC = () => {
  const dispatch = useReduxDispatch();

  return (
    <NavLink
      path={`/api/logout`}
      label="Logout"
      color="red"
      onClick={() => {
        dispatch(resetIncome());
        dispatch(resetExpense());
        dispatch(resetCatalog());
        dispatch(resetDate());
      }}
      icon={<RiLogoutCircleLine size="30" color="rgb(39, 39, 42)" />}
    />
  );
};

export default Logout;
