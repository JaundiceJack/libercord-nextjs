import { FC } from "react";
import Header from "../Header";
import SettingsWindow from "../SettingsWindow";
import ChartDefaults from "./ChartDefaults";
import ColumnDefaults from "./ColumnDefaults";
import InitialBalance from "./InitialBalance";

const Preferences: FC = () => {
  return (
    <SettingsWindow>
      <Header title="User Preferences" />
      <div className="overflow-auto">
        <InitialBalance />
        <ChartDefaults />
        <ColumnDefaults />
      </div>
    </SettingsWindow>
  );
};

export default Preferences;
