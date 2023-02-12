import { FC } from "react";
import type { TitleProps } from "./types";
import BgCSS from "../../../../../styles/Background.module.css";

const LegendTitle: FC<TitleProps> = ({ title }) => {
  return (
    <div className={`flex items-center justify-center h-14 ${BgCSS.container}`}>
      <h2 className={`font-jose text-white text-lg`}>{title}</h2>
    </div>
  );
};

export default LegendTitle;
