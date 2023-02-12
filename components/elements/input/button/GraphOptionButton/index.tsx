import { FC } from "react";
import { GraphOptionButtonProps } from "./types";

const GraphOptionButton: FC<GraphOptionButtonProps> = ({
  label,
  onClick,
  className = "",
  pos = "top",
}) => {
  return (
    <button
      style={{
        boxShadow: `inset 0 ${
          pos === "top" ? "1px" : pos === "middle" ? "0px" : "-1px"
        } 2px 1px #2a2a30`,
      }}
      onClick={onClick}
      className={`group w-full h-8 py-2 cursor-pointer bg-gray-700 
        font-jose text-white font-semibold ${
          pos === "top"
            ? "rounded-t-lg"
            : pos === "bottom"
            ? "rounded-b-lg"
            : ""
        } ${className}`}
    >
      <p className="transform duration-150 group-hover:scale-102">{label}</p>
    </button>
  );
};

export default GraphOptionButton;
