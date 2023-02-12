import { FC } from "react";
import { capitalize } from "../../../../../helpers/strings";
import { HeaderButtonProps } from "./types";
import BtnCSS from "../../../../../styles/Button.module.css";

const HeaderButton: FC<HeaderButtonProps> = ({
  label,
  icon,
  onClick,
  current,
  showArrow = false,
  className,
}) => {
  const tooltipArrow = `${BtnCSS["arrow-bottom"]} ${BtnCSS["arrow-bottom-light"]}`;

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`group py-1 px-2 h-8 rounded-md font-jose
          ${!showArrow || current !== label ? BtnCSS["header-button"] : ""}
          ${
            current === label
              ? `bg-gray-300 text-black ${showArrow ? tooltipArrow : ""}`
              : "bg-gray-500 text-gray-100"
          } ${className}`}
      >
        <div className="transition duration-150 group-hover:scale-102">
          {icon ? icon : capitalize(label)}
        </div>
      </button>
    </div>
  );
};

export default HeaderButton;
