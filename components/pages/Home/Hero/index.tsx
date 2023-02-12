import { FC } from "react";
import Image from "next/image";
import Divider from "./Divider";

const Hero: FC = () => {
  return (
    <div className="relative right-0 z-0 hidden sm:block sm:col-span-2">
      <Divider />
      <Image
        src="/images/bitcoin.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition={-350}
        alt="Bitcoin, credit, and gold."
        className={`absolute right-0 rounded-r-xl rounded-l-xl lg:rounded-l-none`}
      />
    </div>
  );
};

export default Hero;
