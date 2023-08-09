import { FC } from "react";
import Catalog from "./Catalog";
import Preferences from "./Preferences";

const SettingsPage: FC = () => {
  return (
    <div
      className={`
      grid grid-cols-1 lg:grid-cols-2 gap-4
      min-h-screen mx-0 mt-4 sm:m-4 p-4 sm:p-0`}
    >
      <Catalog />
      <Preferences />
    </div>
  );
};

export default SettingsPage;
