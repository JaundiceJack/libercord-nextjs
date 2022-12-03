import React, { FC } from "react";
import Header, { HeaderProps } from "./header";

type DetailWindowProps = HeaderProps & {
  children: React.ReactNode;
  className?: string;
};

const DetailWindow: FC<DetailWindowProps> = ({
  header,
  icon,
  year,
  prev,
  next,
  toggle,
  current,
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col h-full lg:col-span-2 ${className}`}>
      <Header
        header={header}
        icon={icon}
        year={year}
        next={next}
        prev={prev}
        toggle={toggle}
        current={current}
      />

      <div
        style={{ minHeight: 500 + "px" }}
        className="flex grow h-full mb-8 rounded-b-lg bg-content "
      >
        {children}
      </div>
    </div>
  );
};

export default DetailWindow;
