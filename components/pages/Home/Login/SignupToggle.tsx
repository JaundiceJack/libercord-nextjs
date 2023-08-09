import { FC, useState } from "react";
import SignIn from "./Signin";
import SignUp from "./Signup";
import HomeCSS from "../../../../styles/Home.module.css";

interface SignUpToggleProps {
  active: boolean;
  toggle: () => void;
}

const SignUpToggle: FC<SignUpToggleProps> = ({ active, toggle }) => {
  return (
    <button
      onClick={toggle}
      className={`w-full h-full px-6 py-2 ${
        !active
          ? `border-t border-yellow-500 rounded-tr-xl ${HomeCSS["tab-right-active"]}`
          : `${HomeCSS["tab-right"]}`
      }`}
    >
      <p
        className={`text-xl font-semibold font-jose text-white whitespace-nowrap`}
      >
        Create Account
      </p>
    </button>
  );
};

export default SignUpToggle;
