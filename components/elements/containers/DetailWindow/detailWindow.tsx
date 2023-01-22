import React, { FC } from "react";
import Header, { HeaderProps } from "./detailWindowHeader";

type DetailWindowProps = HeaderProps & {
  children: React.ReactNode;
  className?: string;
};

const DetailWindow: FC<DetailWindowProps> = ({
  setWindow,
  currentWindow,
  openColumnModal,
  exportData,
  children,
  className,
}) => {
  return (
    <div
      className={`flex flex-col h-full md:max-h-screen lg:col-span-2 ${className}`}
    >
      <Header
        setWindow={setWindow}
        currentWindow={currentWindow}
        openColumnModal={openColumnModal}
        exportData={exportData}
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
