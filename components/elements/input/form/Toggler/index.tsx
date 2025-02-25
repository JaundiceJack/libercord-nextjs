import { FC, useState } from "react";
import type { TogglerProps } from "./types";
import toggler from "../../../../../styles/Toggle.module.css";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

const Toggler: FC<TogglerProps> = ({
  label,
  defaultChecked,
  onClick,
  className,
}) => {
  const [toggled, setToggled] = useState(defaultChecked);

  return (
    <div
      onClick={() => {
        setToggled(!toggled);
        onClick();
      }}
      className={`grid grid-cols-2 items-center w-48 mb-8 cursor-pointer ${className}`}
    >
      <div
        className={`text-white text-right pointer-events-none select-none relative 
        ml-auto rounded-bl-lg overflow-hidden flex flex-col justify-center`}
      >
        <p className="px-2">{label}</p>
        <div className="bg-gradient-to-b from-blue-base to-blue-dark w-full h-0.5" />
        <div
          className={`w-0.5 h-1 bg-gradient-to-r from-blue-base to-blue-dark 
          absolute -right-px bottom-0.5`}
        />
      </div>
      <div className={`${toggler.container} ${className}`}>
        <div className="relative">
          <ImCross
            className={`${toggler.cross} ${
              !toggled ? toggler.growIcon : toggler.shrinkIcon
            }`}
          />
          <FaCheck
            className={`${toggler.checkmark} ${
              toggled ? toggler.growIcon : toggler.shrinkIcon
            }`}
          />
        </div>

        <div className={`${toggler.toggler}`}>
          <span
            className={`${toggler.fixedOrb1} ${toggler.orb} ${
              !toggled ? toggler.activeOrb : toggler.inactiveOrb
            }`}
          ></span>
          <span
            className={`${toggler.fixedOrb2} ${toggler.orb} ${
              toggled ? toggler.activeOrb : toggler.inactiveOrb
            }`}
          ></span>
          <span
            className={`${
              toggled ? toggler.movingOrbActive : toggler.movingOrbInactive
            } ${toggler.orb} ${
              toggled ? toggler.toggleOn : toggler.toggleOff
            } transition-colors`}
          ></span>
        </div>
        <svg className={`${toggler.svg}`}>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation={5} />
            <feColorMatrix
              values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10"
            />
          </filter>
        </svg>
      </div>
    </div>
  );
};

export default Toggler;
