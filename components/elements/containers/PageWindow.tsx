import { FC, ReactNode } from "react";

interface PageWindowProps {
  children?: ReactNode;
}

const PageWindow: FC<PageWindowProps> = ({ children }) => {
  return <div className="mx-0 mt-4 sm:m-4 p-4 sm:p-0">{children}</div>;
};

export default PageWindow;
