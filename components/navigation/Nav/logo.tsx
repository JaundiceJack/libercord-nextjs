import { FC } from "react";
import Image from "next/image";
import NavLink from "./navlink";

const Logo: FC = () => {
  return (
    <NavLink
      path={`/`}
      label={`Home`}
      color={`yellow`}
      icon={
        <Image
          src={`/images/logoMin.png`}
          layout="fixed"
          height="32"
          width="32"
          alt=""
        />
      }
    />
  );
};

export default Logo;
