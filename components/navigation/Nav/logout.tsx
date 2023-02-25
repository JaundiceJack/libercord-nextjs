import { FC } from "react";
import NavLink from "./navlink";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useReduxDispatch } from "../../../hooks/useRedux";
import { resetIncome } from "../../../redux/income";
import { resetCatalog } from "../../../redux/catalog";
import { resetDate } from "../../../redux/date";
import { resetExpense } from "../../../redux/expense";

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
