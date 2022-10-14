import { FC } from "react";
import { RootState } from "../../store/store";
import { useTypedSelector } from "../../store/hooks";
import Intro from "./intro/intro";
import Hero from "./hero/_hero";
import Login from "./login/_login";
import Swiper from "./swiper/swiper";

const HomeContent: FC = () => {
  return (
    <div
      className={`relative grow grid grid-cols-1 h-full w-full lg:grid-cols-5 `}
    >
      <main
        className={`flex flex-col items-center justify-center bg-gradient-to-r
        from-black to-gray-900 sm:col-span-3 p-2 ml-2 sm:ml-0 mr-2 sm:mr-16 
        lg:mr-0 mb-4 lg:mb-0 mt-4 lg:mt-0
        overflow-hidden lg:rounded-none rounded-xl`}
      >
        <div className={`flex flex-row`}>
          <Intro />
        </div>
        <Login />
      </main>

      <div
        className={`lg:col-span-2 mr-2 ml-2 sm:ml-0 sm:mr-16 lg:mr-0 
      lg:rounded-none rounded-xl overflow-hidden`}
      >
        <div
          className={`absolute lg:block hidden w-6 h-full -ml-3 bg-divider z-40`}
        />
        <Swiper />
      </div>
    </div>
  );
};

export default HomeContent;
