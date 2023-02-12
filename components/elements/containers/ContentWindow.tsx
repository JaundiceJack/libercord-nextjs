import { FC, ReactNode } from "react";

interface ContentWindowProps {
  children?: ReactNode;
}

const ContentWindow: FC<ContentWindowProps> = ({ children }) => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      {children}
    </div>
  );
};

export default ContentWindow;
