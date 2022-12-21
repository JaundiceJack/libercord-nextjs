import { FC } from "react";
import WindowContainer from "../elements/containers/windowContainer";
import CatalogWindow from "./catalog/catalogWindow";

const SettingsContent: FC = () => {
  const catalogWindow = "income";

  return (
    <WindowContainer>
      <CatalogWindow />
    </WindowContainer>
  );
};

export default SettingsContent;
