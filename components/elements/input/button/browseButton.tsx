import { FC } from "react";
import Spinner from "../../misc/spinner";
import { FcPrevious, FcNext } from "react-icons/fc";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

interface BrowseButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  direction?: "next" | "prev";
  color?: string;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const BrowseButton: FC<BrowseButtonProps> = ({
  type = "button",
  onClick,
  direction = "next",
  color = "rgb(252 211 77)",
  title,
  loading = false,
  disabled = false,
  className,
}) => {
  return (
    <div
      title={title}
      className={"relative mx-1 flex items-center justify-center "}
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`focus:outline-none transform duration-300 hover:scale-125 flex 
          items-center ${disabled && "opacity-50 "} ${className}`}
      >
        {loading ? (
          <Spinner />
        ) : direction === "next" ? (
          <BsFillCaretRightFill color={color} size="25" />
        ) : (
          <BsFillCaretLeftFill color={color} size="25" />
        )}
      </button>
    </div>
  );
};

export default BrowseButton;
