import { FC } from "react";
import Header from "./Header";
import Content from "./Content";
import { DataWindowProps } from "./types";

const DataWindow: FC<DataWindowProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col lg:h-screen lg:max-h-screen ${className}`}>
      <Header />
      <Content>{children}</Content>
    </div>
  );
};

export default DataWindow;
