// make it more transparent with context-colored border & text
// 1px border, and the gradient that makes it look shiny that brightens when hover
// since moving would introduce too many moving elements
// it'd be super cool if i could collapse it on submit so it morphs into the loader
// if i could mix in the loader here so the button holds it as a loading state, thatd make morphing them easier

import { FC } from "react";
import Btn from "../../../../../styles/Button.module.css";
import { BasicButtonProps } from "./types";
import { borderClass, textClass } from "../../../../../helpers/colors";
import IOButtonHint from "../ItemOptionButton/IOButtonHint";
const Tailwind = require("../../../../../tailwind.config");

const BasicButton: FC<BasicButtonProps> = ({
  label,
  title,
  icon,
  color,
  type = "button",
  onClick,
  className,
  disabled = false,
  active = false,
  hint,
}) => {
  // I need to set up a color palette/theme
  // or just some way to connect tailwind colors to regular

  return (
    <div className={`group relative ${icon ? "h-8" : "h-10"} ${className}`}>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`h-full w-full border transform duration-500 group 
        hover:border-transparent overflow-hidden 
        ${icon ? "rounded-md" : "rounded-sm"}
        ${
          disabled
            ? "border-gray-400"
            : color === "white"
            ? "border-white"
            : color === "black"
            ? "border-black"
            : color === "green"
            ? "border-green-base"
            : color === "red"
            ? "border-red-base "
            : color === "blue"
            ? "border-blue-base"
            : color === "yellow"
            ? "border-yellow-base"
            : "border-white"
        } 
        ${Btn.container}`}
      >
        <span
          style={{
            background: `linear-gradient(to right, transparent, ${
              Tailwind?.theme?.colors[`${color}-base`]
            })`,
          }}
        ></span>
        <span
          style={{
            background: `linear-gradient(to bottom, transparent, ${
              Tailwind?.theme?.colors[`${color}-base`]
            })`,
          }}
        ></span>
        <span
          style={{
            background: `linear-gradient(to left, transparent, ${
              Tailwind?.theme?.colors[`${color}-base`]
            })`,
          }}
        ></span>
        <span
          style={{
            background: `linear-gradient(to top, transparent, ${
              Tailwind?.theme?.colors[`${color}-base`]
            })`,
          }}
        ></span>
        <div
          className={`flex items-center justify-center w-full h-full
        transform duration-500 ease-in px-2 font-jose text-lg 
        ${
          disabled
            ? "text-gray-400"
            : color === "white"
            ? "text-white group-hover:text-gray-100"
            : color === "black"
            ? "text-black group-hover:text-gray-900"
            : color === "green"
            ? "text-green-base group-hover:text-green-300"
            : color === "red"
            ? "text-red-base group-hover:text-red-300"
            : color === "blue"
            ? "text-blue-base group-hover:text-blue-300"
            : color === "yellow"
            ? "text-yellow-base group-hover:text-yellow-300"
            : "text-white group-hover:text-white"
        } 
        `}
        >
          {label || icon}
        </div>
      </button>

      {hint && <IOButtonHint label={hint} />}
    </div>
  );
};

export default BasicButton;
