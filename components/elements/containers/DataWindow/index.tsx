import { FC } from "react";
import Header from "./Header";
import Content from "./Content";
import { DetailWindowProps } from "./types";

const DetailWindow: FC<DetailWindowProps> = ({
  dataType = "income",
  isSelected,
  openAddModal,
  openEditModal,
  openDeleteModal,
  setWindow,
  currentWindow,
  openColumnModal,
  exportData,
  children,
  className = "",
}) => {
  return (
    <div className={`flex flex-col lg:h-screen lg:max-h-screen ${className}`}>
      <Header
        isSelected={isSelected}
        dataType={dataType}
        openAddModal={openAddModal}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        setWindow={setWindow}
        currentWindow={currentWindow}
        openColumnModal={openColumnModal}
        exportData={exportData}
      />
      <Content>{children}</Content>
    </div>
  );
};

export default DetailWindow;
