import { FC } from "react";
import { capitalize } from "../../../../helpers/strings";

interface HeaderButtonProps {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
  current: string;
  showArrow?: boolean;
  className?: string;
}

const HeaderButton: FC<HeaderButtonProps> = ({
  name,
  icon,
  onClick,
  current,
  showArrow = false,
  className,
}) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`py-1 px-2 ml-1 h-8 rounded-md transform duration-150 hover:scale-105 ${
          current === name
            ? `bg-gray-300 text-black ${showArrow && "activeArrow"}`
            : "bg-gray-500 text-gray-100"
        } ${className}`}
      >
        {icon ? icon : capitalize(name)}
      </button>
    </div>
  );
};

export default HeaderButton;
