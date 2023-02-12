import { FC, ReactNode } from "react";

interface GraphContainerProps {
  children?: ReactNode;
}

const GraphContainer: FC<GraphContainerProps> = ({ children }) => {
  return <div className="grid grid-cols-10 w-full h-full">{children}</div>;
};

export default GraphContainer;
