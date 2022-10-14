import { FC } from "react";
import NavLink from "./navlink";
import { RiLogoutCircleLine } from "react-icons/ri";

const Logout: FC = () => {
  return (
    <NavLink
      path={`/api/logout`}
      label="Logout"
      color="red"
      icon={<RiLogoutCircleLine size="30" color="rgb(39, 39, 42)" />}
    />
  );
};

export default Logout;
