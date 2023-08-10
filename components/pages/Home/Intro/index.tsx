import { FC } from "react";
import Image from "next/image";

const Intro: FC = () => {
  return (
    <div
      className={`w-full h-full mx-auto grid grid-cols-1 sm:grid-cols-5 grid-rows-2`}
    >
      <div
        className={`justify-self-center flex flex-row items-center sm:mt-0 mt-4`}
      >
        <Image height="100" width="100" src={"/images/logo2.png"} alt="logo" />
      </div>
      <h1
        className={`sm:col-start-2 sm:col-span-4 my-auto ml-4 text-center text-transparent font-mont 
          font-semibold bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 
          leading-tight sm:text-left text-6xl sm:leading-normal `}
      >
        LibreCord
      </h1>
      <p
        className={`sm:col-start-2 sm:col-span-4 ml-4 -mt-8 self-start text-blue-200 font-jose font-semibold text-lg `}
      >
        Is your financial health making you sick? Let Librecord help! We've made
        it simple to record your path to financial freedom. Create an account or
        login to begin.
      </p>
    </div>
  );
};

export default Intro;
