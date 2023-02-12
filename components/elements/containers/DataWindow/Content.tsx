import React, { FC } from "react";
import { ContentProps } from "./types";
import BgCSS from "../../../../styles/Background.module.css";

const Content: FC<ContentProps> = ({ children }) => {
  return (
    <div
      className={`flex flex-col grow h-full mb-8 rounded-b-lg ${BgCSS.content} overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default Content;
