// make it more transparent with context-colored border & text
// 1px border, and the gradient that makes it look shiny that brightens when hover
// since moving would introduce too many moving elements
// it'd be super cool if i could collapse it on submit so it morphs into the loader
// if i could mix in the loader here so the button holds it as a loading state, thatd make morphing them easier

import { FC } from "react";
import Btn from "../../../../../styles/Button.module.css";
import { BasicButtonProps } from "./types";
import { borderClass, textClass } from "../../../../../helpers/colors";
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
}) => {
  // I need to set up a color palette/theme
  // or just some way to connect tailwind colors to regular

  return (
    <button
      onClick={onClick}
      className={`w-full h-10 mb-2 border transform duration-500 ${
        color === "white"
          ? "border-white"
          : color === "black"
          ? "border-black"
          : color === "green"
          ? "border-green-base"
          : color === "red"
          ? "border-red-base "
          : "border-white"
      } 
      hover:border-transparent rounded-sm overflow-hidden group ${
        Btn.container
      } ${className} `}
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
        className={`flex items-center justify-center w-full h-full font-jose text-lg ${
          color === "white"
            ? "text-white"
            : color === "black"
            ? "text-black"
            : color === "green"
            ? "text-green-base"
            : color === "red"
            ? "text-red-base"
            : "text-white"
        } 
        transform duration-500 ease-in ${
          color === "white"
            ? "group-hover:text-gray-100"
            : color === "black"
            ? "group-hover:text-gray-900"
            : color === "green"
            ? "group-hover:text-green-300"
            : color === "red"
            ? "group-hover:text-red-300"
            : "group-hover:text-white"
        } `}
      >
        {label || icon}
      </div>
    </button>
  );
};

export default BasicButton;
