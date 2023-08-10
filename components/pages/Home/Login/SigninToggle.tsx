import { FC } from "react";
import HomeCSS from "../../../../styles/Home.module.css";

interface SignInToggleProps {
  active: boolean;
  toggle: () => void;
}

const SignInToggle: FC<SignInToggleProps> = ({ active, toggle }) => {
  return (
    <button
      onClick={toggle}
      className={`w-full h-full px-6 py-2 ${
        active
          ? `border-t border-yellow-500 rounded-tl-xl ${HomeCSS["tab-left-active"]}`
          : `${HomeCSS["tab-left"]}`
      }`}
    >
      <p
        className={`text-xl font-semibold font-jose text-white whitespace-nowrap`}
      >
        Log In
      </p>
    </button>
  );
};

export default SignInToggle;
