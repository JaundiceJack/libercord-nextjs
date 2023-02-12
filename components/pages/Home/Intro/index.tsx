import { FC } from "react";

const Intro: FC = () => {
  const hClasses: string = `w-full mb-4 text-center text-transparent font-mont 
  font-semibold bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 
  leading-tight sm:text-left `;

  return (
    <div
      className={`self-start flex flex-col md:flex-row items-center justify-center
      px-4 mb-6 lg:mb-12 w-80 sm:w-120 md:w-136`}
    >
      <div className="flex flex-col">
        <h1 className={`${hClasses} text-6xl sm:leading-normal sm:mb-0 `}>
          LiberCord{" "}
        </h1>
        <h2 className={`${hClasses} text-2xl`}>Liberty through Finance. </h2>
      </div>

      <p className={`ml-8 text-blue-200 font-jose font-semibold text-md`}>
        Is your financial health making you sick? Let Libercord Help! Create an
        account or login to begin.
      </p>
    </div>
  );
};

export default Intro;
