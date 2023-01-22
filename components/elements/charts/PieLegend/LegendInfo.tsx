import { FC } from "react";
import { Datum } from "../Pie";

interface LegendInfoProps {
  entry: Datum;
}

const LegendInfo: FC<LegendInfoProps> = ({ entry }) => {
  return (
    <div className="col-span-3 flex flex-col">
      <p
        title={entry?.name}
        className={`mr-1 font-semibold font-jose text-white`}
      >
        {`${
          entry?.name &&
          (entry.name.length > 14
            ? entry.name.slice(0, 14) + "..."
            : entry.name)
        }`}
      </p>
      <p className={`ml-1 font-semibold font-jose text-white`}>
        ${entry?.value}
      </p>
    </div>
  );
};

export default LegendInfo;
