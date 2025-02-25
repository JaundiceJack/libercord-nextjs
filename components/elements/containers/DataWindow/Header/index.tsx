import { FC } from "react";
import BgCSS from "../../../../../styles/Background.module.css";
import DateOptions from "./DateOptions";
import ItemOptions from "./ItemOptions";
import TimeframeOptions from "./TimeframeOptions";
import WindowActions from "./WindowActions";
import WindowOptions from "./WindowOptions";

const Header: FC = () => {
  return (
    <div
      className={`relative w-full px-2 py-1.5 flex md:flex-row flex-col z-10
      justify-between items-center rounded-t-lg ${BgCSS.header}`}
    >
      <div className="flex items-center md:order-1 order-3">
        <WindowOptions />
        <ItemOptions />
        <WindowActions />
      </div>
      <DateOptions />
      <TimeframeOptions />
    </div>
  );
};

export default Header;
