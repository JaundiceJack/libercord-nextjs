import { FC } from "react";
import HeaderButton from "../../../input/button/HeaderButton";
import type { WindowOptionsProps } from "../types";

const WindowOptions: FC<WindowOptionsProps> = ({
  setWindow,
  currentWindow,
}) => {
  return (
    <div className="flex flex-row items-center">
      <HeaderButton
        label="graph"
        onClick={setWindow}
        current={currentWindow}
        showArrow={true}
      />
      <HeaderButton
        label="list"
        onClick={setWindow}
        current={currentWindow}
        showArrow={true}
        className="ml-1"
      />
    </div>
  );
};

export default WindowOptions;
