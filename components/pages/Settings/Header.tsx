import { FC } from "react";
import BgCSS from "../../../styles/Background.module.css";

const Header: FC<{ title: string }> = ({ title }) => {
  return (
    <div
      style={{ minHeight: "45px" }}
      className={`w-full px-5 flex items-center text-neutral-100 font-bold ${BgCSS.header}`}
    >
      {title}
    </div>
  );
};

export default Header;
