import { FC } from "react";
import type { InfoProps } from "./types";

const Info: FC<InfoProps> = ({ entry }) => {
  return (
    <div className="col-span-2 flex flex-col h-full justify-between">
      <div
        title={entry?.name}
        className={`mr-1 font-semibold font-jose text-white truncate`}
      >
        {entry?.name}
      </div>
      <div className={`ml-1 font-semibold font-jose text-white`}>
        ${entry?.value}
      </div>
    </div>
  );
};

export default Info;
