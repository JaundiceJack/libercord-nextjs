import { FC } from "react";
import Intro from "./Intro";
import Login from "./Login";
import Swiper from "./Swiper";

const HomePage: FC = () => {
  return (
    <div
      className={`relative grid grid-cols-1 h-full w-full xl:grid-cols-5 overflow-hidden`}
    >
      <main
        className={`grid grid-rows-3 col-span-1 
        bg-gradient-to-r from-black to-gray-900 
        p-2 pb-4 ml-2 mr-2 mb-4 mt-4 overflow-hidden rounded-xl 
        sm:col-span-3 sm:mr-16 sm:ml-0 
        xl:px-20 xl:pt-20 xl:mr-0 xl:mb-0 xl:mt-0 xl:rounded-none `}
      >
        <Intro />
        <Login />
      </main>

      <div
        className={`xl:col-span-2 mr-2 ml-2 sm:ml-0 sm:mr-16 xl:mr-0 relative 
      xl:rounded-none rounded-xl`}
      >
        <div
          style={{
            filter: "blur(5px)",
            opacity: "75%",
            backgroundColor: "rgb(17 24 39)",
          }}
          className={`absolute top-0 left-0 lg:block w-4 h-full -ml-2 z-50`}
        />
        <Swiper />
      </div>
    </div>
  );
};

export default HomePage;
