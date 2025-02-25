import { FC, ReactNode } from "react";

interface GraphBoxProps {
  children?: ReactNode;
  className?: string;
}

const GraphBox: FC<GraphBoxProps> = ({ children, className }) => {
  return (
    <div
      className={`col-span-full md:col-span-6 flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};

export default GraphBox;
