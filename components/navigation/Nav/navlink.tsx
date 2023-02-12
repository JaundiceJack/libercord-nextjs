import { FC } from "react";
import Link from "next/link";
import { capitalize } from "../../../helpers/strings";
import NavCSS from "../../../styles/Nav.module.css";
import BtnCSS from "../../../styles/Button.module.css";

interface NavLinkProps {
  path: string;
  label: string;
  color: string;
  icon: any;
  onClick?: (e: any) => void;
  className?: string;
}

const NavLink: FC<NavLinkProps> = ({
  path,
  label,
  color,
  icon,
  onClick,
  className,
}) => {
  return (
    <Link onClick={onClick} href={path} className={` ${className}`}>
      <div
        className={`relative group flex flex-row items-center h-12 w-12 
        rounded-lg cursor-pointer sm:px-3 px-2 py-2 sm:mr-0 mx-1 sm:mb-3 `}
      >
        <div
          className={`absolute flex items-center justify-center bottom-0 left-0 
          right-0 py-2 px-6 h-12 w-12 rounded-lg border-b-4 transform duration-300
          hover:border-b-0 hover:h-11 focus:outline-none ${
            NavCSS[`nav-button-${color}`]
          }`}
        >
          <div className="flex items-center justify-center">{icon}</div>
        </div>

        <div
          className={`absolute items-center left-16 h-10 p-2 
          ${BtnCSS.tooltip} ${BtnCSS["arrow-left"]} ${BtnCSS["arrow-left-dark"]} 
          rounded-lg pointer-events-none opacity-0 transform duration-300 
          group-hover:opacity-100 sm:flex hidden `}
        >
          <p
            style={{ textShadow: "-1px 0px 10px #111" }}
            className={`text-white text-center w-full font-semibold font-jose`}
          >
            {capitalize(label)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NavLink;
