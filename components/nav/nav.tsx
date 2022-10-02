import { FC } from "react";
import { useTypedSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import NavLinks from "./navlinks";
import Logout from "./logout";
import Logo from "./logo";

const Nav: FC = () => {
  const user = useTypedSelector((state: RootState) => state.user);

  return (
    <nav
      className={`flex flex-row z-50 items-center justify-center sm:flex-col sm:justify-start`}
    >
      <div
        className={`flex flex-row items-center sticky top-2 p-2 sm:flex-col `}
      >
        <Logo />
        <NavLinks />
      </div>

      {user && user.token && <Logout />}
    </nav>
  );
};

export default Nav;
