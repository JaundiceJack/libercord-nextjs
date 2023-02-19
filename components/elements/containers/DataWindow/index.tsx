import { FC } from "react";
import Header from "./Header";
import Content from "./Content";
import { DataWindowProps } from "./types";

const DataWindow: FC<DataWindowProps> = ({
  dataType = "income",
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col lg:h-screen lg:max-h-screen ${className}`}>
      <Header dataType={dataType} />
      <Content>{children}</Content>
    </div>
  );
};

export default DataWindow;
