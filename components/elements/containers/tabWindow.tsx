import { FC } from "react";

interface TabWindowProps {
  tabs: string[];
  children?: any;
}

const TabWindow: FC<TabWindowProps> = ({ tabs, children }) => {
  return (
    <div>
      {tabs.map((tab, index) => {
        return <div key={index}>{tab}</div>;
      })}
      {children}
    </div>
  );
};

export default TabWindow;
