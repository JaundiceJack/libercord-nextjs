import { FC } from "react";
import BasicButton from "../input/button/basicButton";
import BrowseButton from "../input/button/browseButton";
import ToggleButton from "../input/button/toggleButton";
import { AiOutlinePieChart, AiOutlineUnorderedList } from "react-icons/ai";

export interface HeaderProps {
  header?: string;
  icon?: any;
  year: number;
  next: () => void;
  prev: () => void;
  toggle: () => void;
  current: boolean;
}

const Header: FC<HeaderProps> = ({
  header,
  icon,
  year,
  next,
  prev,
  toggle,
  current,
}) => {
  return (
    <div className={`relative w-full h-14 p-2 flex rounded-t-lg bg-header`}>
      <div className="flex">
        <ToggleButton
          icon1={<AiOutlinePieChart />}
          icon2={<AiOutlineUnorderedList />}
          color1="green"
          color2="blue"
          toggleState={current}
          toggleFunc={toggle}
          className="h-8 w-10"
        />
      </div>

      <div className="absolute left-0 right-0 flex items-center justify-center">
        <p className="mr-4 text-yellow-400 text-2xl">{icon}</p>
        <h2
          className={`font-bold font-jose text-2xl text-transparent bg-clip-text 
        bg-gradient-to-b from-yellow-300 to-yellow-500`}
        >
          {header}
        </h2>
      </div>
      <div
        className={`${!header && !icon ? " " : "ml-auto "}
        flex flex-row justify-center items-center`}
      >
        <BrowseButton direction="prev" onClick={prev} title={""} />
        <h4 className="text-blue-200 text-md font-semibold">{year}</h4>
        <BrowseButton direction="next" onClick={next} title={""} />
      </div>
    </div>
  );
};

export default Header;
