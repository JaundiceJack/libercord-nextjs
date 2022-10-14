import { FC } from "react";

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
          ? "border-t border-yellow-500 rounded-tl-xl bg-tab-right-active"
          : "bg-tab-right"
      }`}
    >
      <p className={`font-semibold font-jose text-white whitespace-nowrap`}>
        Log In
      </p>
    </button>
  );
};

export default SignInToggle;
