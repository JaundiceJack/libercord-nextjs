import { FC } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const OptionHR: FC<{ follows?: boolean }> = ({ follows = true }) => {
  return (
    <div className="px-2">
      <div
        style={{ background: "rgb(96, 96, 105)" }}
        className="w-full h-px bg-yellow-500"
      />
      {follows && (
        <div className="relative w-full flex items-center justify-center">
          <IoMdArrowDropdown
            size="25px"
            color="rgb(96, 96, 105)"
            style={{ marginTop: "5px" }}
            className="absolute"
          />
        </div>
      )}
    </div>
  );
};

export default OptionHR;
