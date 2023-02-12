import { FC, ReactNode } from "react";

interface GraphOptionsBoxProps {
  children?: ReactNode;
}

const GraphOptionsBox: FC<GraphOptionsBoxProps> = ({ children }) => {
  return (
    <div className="col-span-full md:col-span-2 flex h-full z-10">
      {children}
    </div>
  );
};

export default GraphOptionsBox;
