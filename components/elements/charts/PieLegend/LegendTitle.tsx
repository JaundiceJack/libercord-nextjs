import { FC } from "react";

interface LegendTitleProps {
  title: string;
}

const LegendTitle: FC<LegendTitleProps> = ({ title }) => {
  return (
    <div className={`flex items-center justify-center h-14 container-bg`}>
      <h2 className={`font-jose text-white text-lg`}>{title}</h2>
    </div>
  );
};

export default LegendTitle;
