import { FC } from "react";
import Catalog from "./Catalog";

const SettingsPage: FC = () => {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 min-h-screen
    mx-0 mt-4 sm:m-4 p-4 sm:p-0`}
    >
      <Catalog />
    </div>
  );
};

export default SettingsPage;
