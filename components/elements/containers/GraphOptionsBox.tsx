import { FC, ReactNode } from "react";
import BgCSS from "../../../styles/Background.module.css";

interface GraphOptionsBoxProps {
  children?: ReactNode;
}

const GraphOptionsBox: FC<GraphOptionsBoxProps> = ({ children }) => {
  return (
    <div
      style={{
        scrollbarColor: "#567 #333",
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
      }}
      className={`col-span-full md:col-span-2 flex flex-col overflow-y-auto ${BgCSS.sidebar}`}
    >
      {children}
    </div>
  );
};

export default GraphOptionsBox;
