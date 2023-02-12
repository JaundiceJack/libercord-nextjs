import { FC } from "react";
import { capitalize } from "../../../../../helpers/strings";
import { IOButtonHintProps } from "./types";
import BtnCSS from "../../../../../styles/Button.module.css";

const IOButtonHint: FC<IOButtonHintProps> = ({ label }) => {
  return (
    <div
      className={`absolute top-11 sm:flex hidden items-center p-2 w-max
      ${BtnCSS.tooltip} ${BtnCSS["arrow-top"]} ${BtnCSS["arrow-top-dark"]}
      rounded-lg pointer-events-none transform duration-500 opacity-0 
      group-hover:opacity-100`}
    >
      <p
        style={{ textShadow: "-1px 0px 10px #111" }}
        className={`text-white text-sm w-full font-semibold font-jose`}
      >
        {label && label}
      </p>
    </div>
  );
};

export default IOButtonHint;
