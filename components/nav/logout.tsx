import { FC } from "react";
import { useTypedDispatch } from "../../store/hooks";
import NavLink from "./navlink";
//import { logout } from "../../../actions/userActions.js";
//import { setPage } from "../../../actions/pageActions.js";
import { RiLogoutCircleLine } from "react-icons/ri";

const Logout: FC = () => {
  const dispatch = useTypedDispatch();
  // Dispatch the logout action if the button is clicked
  const onLogout = () => {
    //dispatch(setPage('login'));
    //dispatch(logout());
  };

  return (
    <NavLink
      path={`/login`}
      label="Logout"
      color="red"
      icon={<RiLogoutCircleLine size="30" color="rgb(39, 39, 42)" />}
      onClick={onLogout}
    />
  );
};

export default Logout;
