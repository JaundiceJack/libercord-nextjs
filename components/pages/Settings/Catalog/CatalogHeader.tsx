import { FC } from "react";
import BgCSS from "../../../../styles/Background.module.css";

const CatalogHeader: FC = () => {
  return (
    <div
      id="catalogOptionsHeader"
      className={`w-full h-14 py-2 px-5 flex items-center rounded-t-lg 
      text-neutral-100 font-bold ${BgCSS.header}`}
    >
      User-Created Options
    </div>
  );
};

export default CatalogHeader;
