import { StaticBoxProps } from "./types";
import { FC, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const StaticBox: FC<StaticBoxProps> = ({
  title,
  children,
  className,
  icon,
  zIndex = 0,
}) => {
  const [titleWidth, setTitleWidth] = useState(0);

  return (
    <div style={{ scrollbarWidth: "thin" }} className="relative ">
      <span
        className={`right-1/4 sm:left-auto sm:right-4 top-5 z-20 absolute w-1/2 
        transform duration-300 p-2 rounded-md flex flex-row items-center 
        text-lg font-semibold text-gray-900 bg-blue-base select-none`}
      >
        {icon}
        {icon && <div className="w-2"></div>}
        <h3 className="whitespace-nowrap text-base text-center mx-auto">
          {title}
        </h3>{" "}
      </span>
      <div
        style={{ zIndex, scrollbarWidth: "thin" }}
        className={`border-blue-base pt-12 relative mt-10 mb-4
      flex border-2 flex-col p-3 rounded-md mx-2 transform duration-300 
      ${className}`}
      >
        <div className={`h-full`}>{children}</div>
      </div>
    </div>
  );
};

export default StaticBox;
