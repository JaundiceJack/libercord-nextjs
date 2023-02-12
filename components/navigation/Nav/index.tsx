import { FC } from "react";
import NavLinks from "./navlinks";
import Logout from "./logout";
import Logo from "./logo";
import useUser from "../../../hooks/useUser";

const Nav: FC = () => {
  const { user } = useUser({});

  return (
    <nav
      className={`flex flex-row z-50 items-center justify-center sm:flex-col sm:justify-start`}
    >
      <div
        className={`flex flex-row items-center sticky top-2 p-2 sm:flex-col `}
      >
        <Logo />

        {user && <NavLinks />}
      </div>
      <div className="grow" />
      {user && <Logout />}
      <div className="sm:h-6" />
    </nav>
  );
};

export default Nav;
