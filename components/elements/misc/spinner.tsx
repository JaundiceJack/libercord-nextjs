import { FC } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <CgSpinnerTwoAlt
        className="animate-spin text-gray-400 text-center"
        size="30"
      />
    </div>
  );
};

export default Spinner;
