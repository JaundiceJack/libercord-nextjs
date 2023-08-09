import { FC, ReactNode } from "react";

interface GraphLegendBoxProps {
  children?: ReactNode;
}

const GraphLegendBox: FC<GraphLegendBoxProps> = ({ children }) => {
  return (
    <div className="col-span-full md:col-span-2 flex h-full overflow-y-hidden">
      {children}
    </div>
  );
};

export default GraphLegendBox;
