import { GroupBoxProps } from "./types";
import { FC, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const GroupBox: FC<GroupBoxProps> = ({
  title,
  children,
  className,
  expanded = true,
  icon,
  zIndex = 0,
}) => {
  const [toggled, setToggled] = useState(expanded);
  const [titleWidth, setTitleWidth] = useState(0);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = "16px 'Josefin Sans'";
      const width = ctx.measureText(title).width;
      setTitleWidth(width / 16 + (icon ? 4.25 : 2.75));
    }
  }, []);

  return (
    <div
      style={{ zIndex }}
      className={`${
        toggled ? " border-green-base pt-12 " : "border-transparent"
      } relative 
      mt-10 mb-4 flex border-2 flex-col p-3 rounded-md mx-2 transform duration-300 ${className}`}
    >
      <span
        onClick={() => setToggled(!toggled)}
        style={{ width: `${toggled ? titleWidth + "rem" : "100%"}` }}
        className={`${
          toggled ? "left-4" : "left-0"
        } absolute -top-5 transform duration-300 p-2 rounded-md flex flex-row items-center 
        text-lg cursor-pointer font-semibold text-gray-900 bg-green-base select-none`}
      >
        {icon}
        {icon && <div className="w-2"></div>}
        <h3 className="whitespace-nowrap text-base">{title}</h3>{" "}
        <MdKeyboardArrowRight
          size="25"
          className={`${
            toggled ? "rotate-90" : "rotate-0"
          } transform duration-300 ml-auto`}
        />
      </span>
      <div
        className={`${
          toggled
            ? "opacity-100 h-full origin-top-right scale-y-100"
            : "opacity-0 pointer-events-none h-0 scale-y-0"
        } transform duration-150 ease-linear`}
      >
        {children}
      </div>
    </div>
  );
};

export default GroupBox;
