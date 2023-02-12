import { FC, ReactNode } from "react";

interface GraphBoxProps {
  children?: ReactNode;
}

const GraphBox: FC<GraphBoxProps> = ({ children }) => {
  return (
    <div className="col-span-full md:col-span-6 flex items-center justify-center">
      {children}
    </div>
  );
};

export default GraphBox;
