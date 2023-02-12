import { FC } from "react";
import type { InfoProps } from "./types";

const Info: FC<InfoProps> = ({ entry }) => {
  return (
    <div className="col-span-3 flex flex-col">
      <p
        title={entry?.name}
        className={`mr-1 font-semibold font-jose text-white truncate`}
      >
        {entry?.name}
      </p>
      <p className={`ml-1 font-semibold font-jose text-white`}>
        ${entry?.value}
      </p>
    </div>
  );
};

export default Info;
