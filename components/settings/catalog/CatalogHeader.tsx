import { FC } from "react";

const CatalogHeader: FC = () => {
  return (
    <div
      id="catalogOptionsHeader"
      className={`w-full h-14 py-2 px-5 flex items-center rounded-t-lg 
    text-neutral-100 font-bold bg-header`}
    >
      User-Created Options
    </div>
  );
};

export default CatalogHeader;
