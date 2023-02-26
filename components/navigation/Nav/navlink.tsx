import Link from "next/link";
import { FC } from "react";
import { capitalize } from "../../../helpers/strings";
import usePath from "../../../hooks/usePath";
import BtnCSS from "../../../styles/Button.module.css";
import NavCSS from "../../../styles/Nav.module.css";

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
  const { basePath } = usePath();

  return (
    <Link href={path} className={` ${className}`}>
      <div
        onClick={onClick}
        className={`relative group flex flex-row items-center h-12 w-12 
        rounded-lg cursor-pointer sm:px-3 px-2 py-2 sm:mr-0 mx-1 sm:mb-3 `}
      >
        <div
          style={{ boxShadow: path === basePath ? "0 0 12px 1px #555a" : "" }}
          className={`absolute flex items-center justify-center bottom-0 left-0 
          right-0 py-2 px-6 h-12 w-12 rounded-lg border-b-4 transform duration-300
          hover:border-b-0 hover:h-11 focus:outline-none group ${
            NavCSS[`nav-button-${color}`]
          }`}
        >
          <div
            className={`relative flex items-center justify-center ${
              path === basePath ? "text-gray-200" : "text-slate-900"
            }`}
          >
            {icon}
          </div>
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
