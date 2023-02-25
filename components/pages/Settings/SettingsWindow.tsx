import { FC, ReactNode } from "react";
import BgCSS from "../../../styles/Background.module.css";

const SettingsWindow: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div
      className={`relative flex flex-col rounded-lg overflow-hidden min-h-screen max-h-screen ${BgCSS.content}`}
    >
      {children}
    </div>
  );
};

export default SettingsWindow;
