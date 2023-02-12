import { FC } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

interface SpinnerProps {
  color?: string;
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ color = "gray-200", className }) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <CgSpinnerTwoAlt
        className={`animate-spin ${
          color === "black"
            ? "text-black"
            : color === "white"
            ? "text-white"
            : "text-" + color
        } text-center`}
        size="30"
      />
    </div>
  );
};

export default Spinner;
