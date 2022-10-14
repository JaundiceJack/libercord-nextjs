import { FC, useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

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
          ? "border-t border-yellow-500 rounded-tr-xl bg-tab-left-active"
          : "bg-tab-left"
      }`}
    >
      <p className={`font-semibold font-jose text-white whitespace-nowrap`}>
        Create Account
      </p>
    </button>
  );
};

export default SignUpToggle;
