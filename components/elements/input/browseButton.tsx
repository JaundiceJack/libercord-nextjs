import { FC } from "react";
import Spinner from "../misc/spinner";
import { FcPrevious, FcNext } from "react-icons/fc";

interface BrowseButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  direction?: "next" | "prev";
  color?: string;
  brightness?: string;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const BrowseButton: FC<BrowseButtonProps> = ({
  type = "button",
  onClick,
  direction = "next",
  color = "green",
  brightness = "400",
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
          <FcNext size="25" />
        ) : (
          <FcPrevious size="25" />
        )}
      </button>
    </div>
  );
};

export default BrowseButton;
